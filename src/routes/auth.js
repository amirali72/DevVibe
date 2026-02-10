const express = require("express");
const authRouter = express.Router();
const User = require("../models/user")
const { validateSignup } = require("../utils/validation")
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignup(req)

        const { firstName, lastName, emailId, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailId, password: hashedPassword })

        await user.save()
        res.send("User signed up Successfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            var token = await user.getJWT();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 7 * 24 * 3600000),
                secure: true,
            })
            res.send("Login Successful")
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = authRouter;