const express = require('express');
const app = express();

app.use(express.json());

app.get('/home',(req,res)=>{
    res.send('hee ! Welcome back Hommie!')
})

app.post('/signup',(req,res)=>{
    const {name,age,place} = req.body;
    let arr = {
        name,
        age,
        place
    }
    res.json({
        msg:"signup has been done",
        arr
    })
})
app.get('/new',(req,res)=>{
    res.send("kay sangu ranii mala gav sutana kas sangu ranii mala gav sutana")
})

const Port = 5000

app.listen(Port,()=>{
    console.log("Server is Started buddy!");
    
})