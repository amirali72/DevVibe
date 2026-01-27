const express = require('express');

const app = express();

const user = ['amir']

app.get("/user",(req,res)=>{
    res.send({firstName:"Amir", lastName:"Ali"})
})

app.post("/user",(req,res)=>{
    console.log(req.body)
    //saving to db
    res.send("Data Saved successfully")
})

app.delete("/user",(req,res)=>{
    res.send("Deleted successfully")
})

app.get(/.*fly$/,(req,res)=>{
    res.send("Hello from hellow url")
})

app.get("/test",(req,res)=>{
    console.log(req.query);
    res.send("Req Query Tested")
})

app.get("/paramstest/:name",(req,res)=>{
    console.log(req.params);
    res.send("Req Params Tested")
})

app.listen(7777, ()=>{
    console.log("Server running");
})