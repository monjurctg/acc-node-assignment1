const db = require("../utils/functions");
const crypto = require("crypto");
const userFuntion = {};
userFuntion.getAllUser = async (req, res) => {
  let users = await db.getUsers();
  const { limit } = req.query;
  if (limit) {
    users = await db.limitUser(limit);
  }
  if (users) {
    res.json({ users });
  }
};

// random user
userFuntion.randomUser = async (req, res) => {
  // const users = await db.getUsers();
  //   console.log(users);
  const randomno = await db.random();
  res.json({ user: randomno });
};
userFuntion.deleteUser = async (req, res) => {
  // const users = await db.getUsers();
  //   console.log(users);
  const randomno = await db.deleteUser();
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
