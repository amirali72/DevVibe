const express = require('express');

const app = express();

const user = ['amir']

app.get("/user",(req,res)=>{
    res.send(user)
})

app.post("/user",(req,res)=>{
    user.push("ali")
    console.log(user);
    
    res.send(user)
})

app.use("/hellow",(req,res)=>{
    res.send("Hello from hellow url")
})

app.listen(7777, ()=>{
    console.log("Server running");
})