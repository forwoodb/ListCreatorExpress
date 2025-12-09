import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    req.session.user_id = user._id;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  user.save();
  res.redirect("./login");
};
