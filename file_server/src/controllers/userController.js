const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../models/user/user");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile)
      return res.status(400).json({ success: false, message: "Required fields missing" });
    console.log("Original password before hashing:", password);
    
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ success: false, message: "User already exists" });
    const user = await createUser({ name, email, mobile, password });

    const safeUser = { id: user.id, name: user.name, email: user.email, mobile: user.mobile };
    res.status(201).json({ success: true, data: safeUser, message: "User registered successfully" });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const bcrypt = require("bcrypt");

(async () => {
  const hash = "$2b$10$ehrznnbOFD2kNRPqMT4fIOGJCL7QlSj0AAm4bIVAfuVbFHuyvalua";
  const result = await bcrypt.compare("12345", hash);
  console.log("Compare result:", result);
})();

    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password are required" });
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    console.log(user.password);
    console.log(password)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const safeUser = { id: user.id, name: user.name, email: user.email, mobile: user.mobile };
    res.status(200).json({ success: true, data: safeUser, message: "Login successful" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { register, login };
