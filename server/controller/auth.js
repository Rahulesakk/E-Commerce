// const user = require("../models/user");
const User = require("../models/user");

exports.createOrUpdateUser = async (req, res, next) => {
  const { name, picture, email } = req.user;
  console.log(req.user);
  const user = await User.findOneAndUpdate(
    { email: email },
    { name: name, picture: picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
    res.end();
  } else {
    const newUser = await new User({
      name: name,
      picture: picture,
      email: email,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
    res.end();
  }
};

exports.currentUser = async(req,res,next)=>{
  User.findOne({email:req.user.email}).exec((err,user) => {
    if(err) throw new Error(err)
    res.json(user)
  })
}
