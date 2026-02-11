const express = require('express');
const app = express();
const User = require('./Models/userData')
const mongoDB = require('./Database/FebServer')
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken');
const {UserAuth} = require("./Middlewares/auth")

app.use(express.json());
app.use(cookieParser());

app.get('/home',(req,res)=>{
    res.send('hee ! Welcome back Hommie!')
})

app.post('/signup',async (req,res)=>{
   try {
     const {firstName,lastName,age,place,emailID,password} = req.body;

     const passHash = await bcrypt.hash(password,10);

    const arr = new User ({
        firstName,
        lastName,
        age,
        place,
        emailID,
        password:passHash
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


app.post('/login',async (req,res)=>{
    try {
        const {emailID,password} = req.body;
           const user = await User.findOne({ emailID:emailID });
    // res.send(password)
           const match = await bcrypt.compare(password,user.password)

        if(!match){
            res.send('password is wrong try again')
        }

    if (!user) {
        return res.status(404).json({
            success: false,
            msg: "User not found"
        });
    }
    const token = await jwt.sign({_id:user._id},"Learning@2024")
    res.cookie("token",token);

      res.status(200).json({
        success: true,
        msg: "User fetched successfully Sir!",
        data: user
    });
    } catch (error) {
        console.log(error)
    }

})

app.get("/user/profile",UserAuth, async(req,res)=>{
    try {
     const user = req.user
     res.send(user)

    } catch (error) {
        res.send(error.message)
    }
})

app.patch('/user/edit',async(req,res)=>{
    try {
        // const {emailID,password} = req.body
        const {firstName,lastName,age,place,emailID,password} = req.body;
        const user = await User.findOne({emailID:emailID});
        if(!user){
            res.send("user doesn't exist")
        }
        
        const newUser = new User ({
           firstName:firstName,
           lastName:lastName,
            age:age,
            place:place
        })

        await newUser.save()

        res.json({
            msg:"edit the data and save the user",
            data:newUser
        })

    } catch (error) {
        
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