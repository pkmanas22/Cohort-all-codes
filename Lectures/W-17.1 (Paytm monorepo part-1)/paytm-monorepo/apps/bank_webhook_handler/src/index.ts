import express from 'express'
import db from '@manaspaytm/db/client'
import z from 'zod'

const app = express();

app.post("/hdfcwebhook", async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformationSchema = z.object({
        token: z.string().min(1, "Token is mandatory"),
        userId: z.string().min(1, "User Id is mandatory"),
        amount: z.string().min(1, "Amount is mandatory"),
    })
    type paymentInformationType = z.infer<typeof paymentInformationSchema>;

    const response = paymentInformationSchema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({
            msg: "Invalid data format"
        })
    }

    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them

    const paymentInformation: paymentInformationType = {
        token: response.data.token,
        userId: response.data.userId,
        amount: response.data.amount,
    };

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success"
                }
            })
        ]);

        return res.status(200).json({
            msg: "captured"
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({      // refund the amount
            message: "Error while processing webhook"
        })
    }
})

app.listen(8000, () => {
    "serverhook started at 8000"
})