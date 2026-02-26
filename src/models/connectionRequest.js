const mongoose = require('mongoose');

const { Schema } = mongoose;

const connectionRequestSchema = new Schema({
    fromUserId : {
        type: Schema.Types.ObjectId,
        required: true
    },
    toUserId : {
        type: Schema.Types.ObjectId,
        required: true
    },
    status : {
        type: String,
        enum:{
            values:["ignored",'interested',"accepted","rejected"]
        },
        required: true
    }
},
{
    timestamps: true
});

connectionRequestSchema.index({fromUserId:1, toUserId:1});

connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to yourself");
    }
    next();
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
