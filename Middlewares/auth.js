const jwt = require("jsonwebtoken");
const User = require("../Models/userData");

const UserAuth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    
    const { token } = req.cookies;
    if (!token) {
      res.send("pls login");
    }

    const decodeData = await jwt.verify(token, "Learning@2024");

    const { _id } = decodeData;

    const user = await User.findById(_id);
    if (!user) {
      res.send("User Doesn't exist!");
    }

    req.user = user;
    next();
  } catch (error) {
    res.send("Invalid token");
  }
};

module.exports = {
    UserAuth
}
