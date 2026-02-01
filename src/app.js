const express = require('express');
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")

app.use(express.json());

app.post("/signup", async (req, res) => {

    const user = new User(req.body)

    try {
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

app.patch("/user", async (req, res) => {
    const updatedData = req.body;
    try {
        const user = await User.findByIdAndUpdate(updatedData.userId, { $set: req.body }, { returnDocument: 'after', runValidators: true })
        res.send("User Updated Successfully");
    } catch (error) {
        res.status(400).send("Something went wrong"+error.message);
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

