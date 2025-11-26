const express = require('express');
const app = express();

app.use(express.json());

app.get('/home',(req,res)=>{
    res.send('hee ! Welcome back Hommie!')
})

app.post()
app.get('/new',(req,res)=>{
    res.send("kay sangu ranii mala gav sutana kas sangu ranii mala gav sutana")
})

const Port = 5000

app.listen(Port,()=>{
    console.log("Server is Started buddy!");
    
})