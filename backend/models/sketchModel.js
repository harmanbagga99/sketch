const moongose = require("mongoose");

const SketchSchema = new moongose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  sketchData: {
    type: Object,
    required: true,
  },
  userList:{
    type:Array,
    required:true
  }
});

const Sketch = moongose.model("Sketch", SketchSchema);

module.exports = Sketch;
