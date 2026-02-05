const express = require('express');
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")
const { validateSignup } = require("./utils/validation")

app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        validateSignup(req)

        const user = new User(req.body)


        await user.save()
        res.send("User Added Successfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }
})

app.get("/user", async (req, res) => {

    try {
        const users = await User.find({ emailId: req.body.emailId })
        res.send(users);
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

app.get("/findbyid", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        res.send(user)
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

app.delete("/user", async (req, res) => {
    const emailId = req.body.emailId;
    try {
        const users = await User.findOneAndDelete({ emailId: emailId })
        res.send("User deleted Successfully");
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

app.patch("/user/:userId", async (req, res) => {
    const updatedData = req.body;
    const userId = req.params.userId;
    try {
        const allowedUpdates = ["photoUrl", "skills", "gender", "age", "about"];
        const isAllowedUpdate = Object.keys(updatedData).every((k) => allowedUpdates.includes(k))
        if (!isAllowedUpdate) {
            throw new Error("This field can't be updated");
        }
        if (updatedData?.skills?.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate(userId, { $set: req.body }, { returnDocument: 'after', runValidators: true })
        res.send("User Updated Successfully");
    } catch (error) {
        res.status(400).send("Something went wrong" + error.message);
    }
})

app.patch("/userUpdate", async (req, res) => {
    const updatedData = req.body;
    try {
        const user = await User.findOneAndUpdate({ emailId: updatedData.emailId }, { $set: req.body }, { returnDocument: 'after', runValidators: true })
        res.send("User Updated Successfully");
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})


connectDB()
    .then(() => {
        console.log("DB Connection Established");
        app.listen(7777, () => {
            console.log("Server running");
        })
    }).catch((err) => {
        console.error("DB COnnection can't be established");
    })

