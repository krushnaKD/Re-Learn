const express = require('express');
const app = express();
const User = require('./Models/userData')
const mongoDB = require('./Database/FebServer')
app.use(express.json());

app.get('/home',(req,res)=>{
    res.send('hee ! Welcome back Hommie!')
})

app.post('/signup',async (req,res)=>{
   try {
     const {firstName,lastName,age,place,emailID} = req.body;
    const arr = new User ({
        firstName,
        lastName,
        age,
        place,
        emailID
    })
    await arr.save()
    res.json({
        msg:"signup has been done",
        arr
    })
    
   } catch (error) {
      console.log(error)
      res.status(500).json({
        msg:"error",
        error:error.message
      })
   }
})
app.get('/user',async(req,res)=>{
    try {
        const data = await User.find()
        res.json({
            msg:"These are the all user Sir",
            user:data
        })
    } catch (error) {
        console.log(error);
        
    }
})

app.post('/login',async (req,res)=>{
    try {
        const {emailID} = req.body;
           const user = await User.findOne({ emailID:emailID });

    if (!user) {
        return res.status(404).json({
            success: false,
            msg: "User not found"
        });
    }
      res.status(200).json({
        success: true,
        msg: "User fetched successfully",
        data: user
    });
    } catch (error) {
        console.log(error)
    }

})

const Port = 5000
mongoDB().
then(()=>{
    console.log("connected Successfully")
    app.listen(Port,()=>{
    console.log("Server is Started buddy!");
})
})
.catch((err)=>{
    console.log("X mongoDB connection Failed ",err.message);
    
})