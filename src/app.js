const express = require('express');
const app = express();
const connectDB = require("./config/database")
const User = require("./models/user")

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "raza",
        lastName: "ali",
        emailId: "raza@gmail.com",
        password: "3456"
    })

    try {
        await user.save()
        res.send("User Added Successfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
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

