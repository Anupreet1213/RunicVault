const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authValidator = require("../utils/validation");

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!authValidator(email, password, name)) {
      throw new Error("Invalid credentials in Signup");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.send("User Created!");
  } catch (err) {
    res.status(401).json({ Error: err.message });
  }
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!authValidator(email, password)) {
      throw new Error("Invalid credentials in Signin");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Cannot find user!!");
    }

    const isValidPwd = await bcrypt.compare(password, user.password);

    if (!isValidPwd) {
      throw new Error("Invalid Password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send("Successfully Logged In!");
  } catch (err) {
    res.status(401).json({ Error: err.message });
  }
};

const userSignout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Signout successful!" });
  } catch (err) {
    res.status(500).json({ error: "Signout failed!" });
  }
};

module.exports = { userSignup, userSignin, userSignout };
