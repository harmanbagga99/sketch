const Sketch = require("../models/sketchModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const moongose = require("mongoose");

exports.addSketch = catchAsync(async (req, res, next) => {
  const response = await Sketch.create({
    sketchData: req.body.sketchData,
    createdBy: req.body.createdBy,
    userList: [{ userName: req.body.createdBy, color: req.body.color }],
  });

  res.status(200).json({ message: "Sketch success added", status: true });
});

exports.getById = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    next(new AppError("Sketch Id can\'t be empty", 400));
    return;
  }
  const response = await Sketch.findById(req.params.id);
  res
    .status(200)
    .json({ message: "Sucessfully Retrived", status: true, data: response });
});

exports.getList = catchAsync(async (req, res, next) => {
  const response = await Sketch.find();
  res
    .status(200)
    .json({ message: "Sucessfully Retrived", status: true, data: response });
});

exports.updateSketch = catchAsync(async (req, res, next) => {
  const user = await Sketch.find({
    _id: moongose.Types.ObjectId(req.params.id),
    userList: { $elemMatch: { userName: req.body.user } },
  });
  let response;
  if (user.length === 0) {

    response = await Sketch.findByIdAndUpdate(req.params.id, {
      $push: {
        userList: {
          userName: req.body.user,
          color: req.body.color,
        },
      },
      $set: { sketchData: req.body.sketchData },
    });
  } else {
    response = await Sketch.findByIdAndUpdate(req.params.id, {
      $set: { sketchData: req.body.sketchData },
    });
  }

  res
    .status(200)
    .json({ message: "Sketch update Sucessfully", status: true, data: response });
});
