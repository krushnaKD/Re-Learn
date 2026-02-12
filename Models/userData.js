const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  emailID: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  lastName: {
    type: String,
    require: false,
  },
  age: {
    type: Number,
    require: true,
  },
  place: {
    type: String,
    require: true,
  },
  
}
,
{
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function(){
  const user = this;

  const token = await jwt.sign({_id:user._id},"Learning@2024",{expiresIn : "1d"})

  return token

}

module.exports = mongoose.model("User", userSchema);
