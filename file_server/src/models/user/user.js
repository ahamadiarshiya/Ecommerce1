const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv({ allErrors: true });
const userSchema = require("../../models/user/userSchema");
addFormats(ajv); 
const saltRounds = 10;

const DATA_FILE = path.join(__dirname, "../../data/credentials.json");

const validateUser = ajv.compile(userSchema);


const readUsers = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = async (users) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf8");
};

const findUserByEmail = async (email) => {
  const users = await readUsers();
  return users.find(u => u.email === email);
};

const createUser = async ({ name, email, mobile, password }) => {
  const data = { name, email, mobile, password };
  if (!validateUser(data)) {
    throw new Error("Invalid user data: " + ajv.errorsText(validateUser.errors));
  }

  const users = await readUsers();
  if (users.find(u => u.email === email)) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    mobile,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
};

module.exports = { readUsers, writeUsers, findUserByEmail, createUser };
