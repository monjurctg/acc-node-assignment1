const db = require("../utils/functions");
const crypto = require("crypto");
const userFuntion = {};
userFuntion.getAllUser = async (req, res) => {
  console.log("object");
  const users = await db.getUsers(); //get user take a filepath
  if (users) {
    res.json({ users });
  }
};

// random user
userFuntion.randomUser = async (req, res) => {
  const { limit } = req.query;
  console.log(limit);
  const users = await db.getUsers();
  //   console.log(users);
  const randomno = users[Math.floor(Math.random() * users.length)];

  res.json({ user: randomno });
};

userFuntion.saveUser = async (req, res) => {
  var id = crypto.randomBytes(4).toString("hex");
  const { gender, name, contact, address, photoUrl } = req.body;
  const newUser = {
    Id: id,
    gender,
    name,
    contact,
    address,
    photoUrl,
  };

  const data = await db.setUser(newUser);
  if (data.status == 200) {
    res.send(data);
  }
};

module.exports = userFuntion;
