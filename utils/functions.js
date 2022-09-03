const fs = require("fs");
var path = require("path");
let file = "../data/data.json";
// let file2 = path.dirname(file);
// const process = require("process");
class Database {
  // get all data from json data
  users = fs.readFileSync(`${__dirname}/../data/data.json`);
  async getUsers() {
    if (this.users.length > 0) {
      return JSON.parse(this.users);
    } else {
      return "not found";
    }
  }

  async random() {
    let userData = await this.getUsers();
    const randomUser = userData[Math.floor(Math.random() * userData.length)];

    return randomUser;
  }
  //   set a data in json
  async setUser(saveData, method) {
    //   console.log(getUsers());
    let data;
    let userData = await this.getUsers();
    if (method == "array") {
      userData = await saveData;
    } else if (method == "save") {
      userData.push(saveData);
    }
    // console.log(userData);

    if (userData) {
      const newData = JSON.stringify(userData);
      data = await fs.promises
        .writeFile(`${__dirname}/../data/data.json`, newData)
        .then(() => {
          return { status: 200, message: "add success" };
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    }
    return data;
  }
  async limitUser(limit) {
    console.log(limit);
    let userData = await this.getUsers();
    let limitUser = [];
    let length;
    if (userData.length < 0) {
      length = userData.length;
    } else {
      length = limit;
    }
    for (let i = 0; i < limit; i++) {
      const randomUser = await this.random();

      limitUser.push(randomUser);
    }

    return limitUser;
  }
  async deleteUser(id) {
    const allUser = await this.getUsers();

    let resData = allUser.filter((user) => user.Id != id);

    if (resData.length > 0) {
      console.log("delet");
      await this.setUser(resData, "array");
    }
  }
  async updateOne(id, body) {
    console.log(body, "kdjfkdj");
    const allUser = await this.getUsers();
    const update = allUser.map((user) => {
      if (user.Id == id) {
        console.log(user.name, body[0].name);
        user.Id = id;
        user.name = body[0].name ?? user.name;
        user.gender = body[0].gender ?? user.gender;

        user.contact = body[0].contact ?? user.contact;

        user.photoUrl = body[0].photoUrl ?? user.photoUrl;
      }
      return user;
      // console.log(findUser);
    });
    const result = await this.setUser(update, "array");
    return result;
  }
  async updateMany(seletctdUsers) {
    const allUser = await this.getUsers();
    let upadateUsers = allUser.map((user) => {
      var found = seletctdUsers.find((s) => s.Id === user.Id);
      if (found) {
        user = Object.assign(user, found);
      }
      return user;
    });
    const result = await this.setUser(allUser, "array");
    return result;
  }
}
let db = new Database();

// console.log(db.getUsers());
module.exports = db;
