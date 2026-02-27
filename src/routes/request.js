const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['interested', 'ignored'];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid Status Type");
        }

        const isToUserExist = await User.findById(toUserId)
        if (!isToUserExist) {
            return res.send({ message: "User doesn't exist in DB" });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).send({ message: "Connection Request already exisits!" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })

        const data = await connectionRequest.save();

        res.json({
            message: "Request sent Successfully",
            data
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

requestRouter.post(
    "/request/review/:status/:requestId", 
    userAuth, 
    async(req, res) => {
    try {
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Status not found!"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if(!connectionRequest){
            return res.status(404).json({message:"Request not found"});
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();
        res.json({message:"Connection Request"+status, data})
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }

})

module.exports = requestRouter;