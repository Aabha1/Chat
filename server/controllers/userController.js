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

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });

    const isPassword = await brcypt.compare(password, user.password);
    if (!isPassword)
      return res.json({ msg: "Incorrect username or password", status: false });

    delete user.password;

    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};
