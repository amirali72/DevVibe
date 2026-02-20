const express = require('express');
const profileRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const { userAuth } = require('../middleware/auth');
const { validateEditProfileData } = require('../utils/validation');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("Error:- " + error.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);

        await loggedInUser.save();
        res.json({ message: `${loggedInUser.firstName} - Updated Successfully`, data: loggedInUser });
    } catch (error) {
        res.status(400).send("Error:- " + error.message);
    }
})

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const { password } = req.body;
        if (!validator.isStrongPassword(password)) {
            throw new Error("Please add a strong password ");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        var token = await user.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 3600000),
            secure: true,
        })
        res.json({message:"Password Change Successfully"})
    } catch (error) {
        res.status(400).send("Error:- " + error.message);
    }

})

module.exports = profileRouter;