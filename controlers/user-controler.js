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
  /**
   * delete a user
   * to delete an user you have to send an user id 

   */
  const id = req.params.id;

  const randomno = await db.deleteUser(id);
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

  const data = await db.setUser(newUser, "save");
  if (data.status == 200) {
    res.send(data);
  }
};

userFuntion.updateUser = async (req, res) => {
  /**
   * update a user
   * to update an user you have to send an user id  and all properties in body

   */

  const { gender, name, contact, address, photoUrl } = req.body;
  const id = req.params.id;
  const newUser = {
    gender,
    name,
    contact,
    address,
    photoUrl,
  };

  const data = await db.updateOne(id, [newUser]);
};
userFuntion.updateManyUser = async (req, res) => {
  /**
   * update many user
   * to update many user you have to send an array of object of user in body
   * body will be like in the bellow
   *  selcetedUser:[{Id,..rest},{Id,..rest}]
   */

  const result = await db.updateMany(req.body.selcetedUser);
  res.send(result);
};

module.exports = userFuntion;
