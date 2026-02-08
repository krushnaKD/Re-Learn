const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstName:{
        type:String,
        require:true

    },
    emailID:{
        type:String,
        require:true
    },
     lastName:{
     type:String,
     require:false
   },
   age:{
    type:Number,
    require:true
   },
   place:{
    type:String,
    require:true
   }
}


)

module.exports = mongoose.model("User",userSchema)