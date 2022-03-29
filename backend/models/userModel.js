const moongose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new moongose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  color:{
    type:String,
    required:true
  }
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});
UserSchema.methods.correctPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = moongose.model("User", UserSchema);

module.exports = User;
