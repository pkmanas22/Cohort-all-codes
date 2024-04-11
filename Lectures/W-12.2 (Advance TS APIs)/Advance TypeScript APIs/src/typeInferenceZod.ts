import { z } from 'zod';
import express from "express";

const app = express();

// Define the schema for profile update
const userProfileSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email format" }),
    age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});


// Using zod infer
type updateBody = z.infer<typeof userProfileSchema>

app.put("/user", (req, res) => {
    const { success, data } = userProfileSchema.safeParse(req.body);
    //   const updateBody = req.body; // how to assign a type to updateBody?
    //   one way is 
    const updateBody1: {
        name: string,
        email: string,
        age: number,
    } = req.body;       // In this approach, it does not maintain DRY rule

    const updateBody: updateBody = data;

    if (!success) {
        res.status(411).json({});
        return
    }
    // update database here
    res.json({
        message: "User updated"
    })
});

app.listen(3000);