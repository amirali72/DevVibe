const express = require('express');

const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello")
})

app.use("/hello",(req,res)=>{
    res.send("Hello from hello url")
})

app.listen(7777, ()=>{
    console.log("Server running");
})