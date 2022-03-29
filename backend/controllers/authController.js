const Auth = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt=require('jsonwebtoken')

exports.signUp = catchAsync(async (req, res, next) => {
  if (!req.body.email) {
    next(new AppError("Email can't be empty ", 400));
    return;
  }
  if (!req.body.password) {
    next(new AppError("Password can't be empty ", 400));
    return;
  }
  if (!req.body.userName) {
    next(new AppError("User Name can't be empty ", 400));
    return;
  }
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.round(Math.random() * 15)];
  }
  const sign = await Auth.create({
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    color:color
  });

  res.status(200).json({ message: "Regisration success", status: true });
});

exports.logIn = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    next(new AppError("Please provide email and password", 400));
    return;
  }
  
  const user = await Auth.findOne({ email: req.body.email });
  if (user) {
    const correct = await user.correctPassword(
      req.body.password,
      user.password
    );
    if (correct) {
      let token = jwt.sign({email:user.email,userName:user.userName,color:user.color},process.env.JWT_SECRET)

      res
        .status(200)
        .json({ message: "Login success", status: true, token ,userName:user.userName,color:user.color});
    } else {
      next(new AppError("Invalid Password", 400));
      return;
    }
  } else {
    next(new AppError("Invalid Email", 400));
    return;
  }
});
