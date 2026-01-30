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
    try {
        const user = await User.findById("697d043d38bae3b0dd4485de");
        res.send(user)
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

