import expres from 'express';
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from "cors"
import path from 'path';

const app = expres()

const JWT_SECRET = "my@secret"

app.use(cookieParser());
app.use(expres.json())
app.use(cors({
    // credentials: true,
    // origin: "http://localhost:5173"
}))
// inside cors is needed for react frontend.

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    // db validations goes here

    try {
        const token = jwt.sign({
            email,
            password
        }, JWT_SECRET);
    
        // set cookies
        res.cookie("token", token);
        res.send("logged in");
    } catch (error) {
        res.send("error")
    }
})

app.get('/user', (req, res) => {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // get email of the user from database
    // console.log(decoded);
    
    res.json({
        userId: decoded.iat
    })
})

app.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.cookie("token", "");            // setcookie => token = ""

    res.json({
        msg: "logged out!"
    })
})

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"))
})

app.listen(3000, () => {
    console.log("Listened at 3000")
})