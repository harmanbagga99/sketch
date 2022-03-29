const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.jwtVerify = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const decoded = await jwt.verify(authorization, process.env.JWT_SECRET);

  } else {
    next(new AppError(`invalid Token`, 404));
  }
  next();
});
