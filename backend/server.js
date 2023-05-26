const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");
const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/api/register", async (req, res) => {
  const newUser = req.body;
  const usersData = JSON.parse(fs.readFileSync("../db/users.json"));
  // Check if the email already exists
  const existingUser = usersData.find((user) => user.email === newUser.email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword;
  // Add the new user
  usersData.push(newUser);
  fs.writeFileSync("../db/users.json", JSON.stringify(usersData));
  res.json({ success: true });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const usersData = JSON.parse(fs.readFileSync("../db/users.json"));
  const user = usersData.find((user) => user.email === email);
  if (!user) {
    // User not found
    return res.status(400).json({ error: "Invalid email or password" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    // Password doesn't match
    return res.status(400).json({ error: "Invalid email or password" });
  }
  // Login successful
  res.json({ success: true, name: user.name });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
