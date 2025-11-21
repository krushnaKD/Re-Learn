const express = require('express');
const app = express();

app.use(express.json());

app.get('/home',(req,res)=>{
    res.send('hee ! Welcome back Hommie!')
})

const Port = 5000

app.listen(Port,()=>{
    console.log("Server is Started buddy!");
    
})