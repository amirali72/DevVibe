const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth');


requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const { firstName } = req.user;
        res.send(firstName + " is sending the request ")
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

module.exports = requestRouter;