const User = require("../models/userModel");
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernamecheck = await User.findOne({ username });
    if (usernamecheck)
      return res.json({ msg: "Username is taken", status: false });

    const emailcheck = await User.findOne({ email });
    if (emailcheck)
      return res.json({ msg: "Email already in use", status: false });

    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};
