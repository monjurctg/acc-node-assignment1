const fs = require("fs");
var path = require("path");
let file = "./data/data.json";
let file2 = path.dirname(file);
const process = require("process");
class Database {
  // get all data from json data

  async getUsers() {
    const data = await fs.promises.readFile(
      `${process.cwd() + "/data"}/data.json`,
      "utf-8"
    );
    if (data.length) {
      return JSON.parse(data);
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
    if (method == "delete") {
      userData = await saveData;
    } else if (method == "save") {
      userData.push(objecData);
    }
    console.log(userData);

    if (userData) {
      const newData = JSON.stringify(userData);
      data = await fs.promises
        .writeFile(`${process.cwd() + "/data"}/data.json`, newData, "utf-8")
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
  async deleteUser() {
    const deleteUser = await this.random();
    const allUser = await this.getUsers();

    let resData = allUser.filter((user) => user.Id != deleteUser.Id);

    if (resData.length > 0) {
      console.log("delet");
      await this.setUser(resData, "delete");
    }
  }
  async updateOne() {}
  async updateMany(seletctdUsers) {
    const allUser = await this.getUsers();
    let upadateUsers = allUser.map((user) => {
      var found = seletctdUsers.find((s) => s.Id === user.Id);
      if (found) {
        user = Object.assign(user, found);
      }
      return user;
    });
  }
}
let db = new Database();

// console.log(db.getUsers());
module.exports = db;
