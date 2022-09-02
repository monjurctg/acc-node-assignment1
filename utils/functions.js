const fs = require("fs");
var path = require("path");
let file = "./data/data.json";
let file2 = path.normalize(file);
class Database {
  // get all data from json data

  async getUsers() {
    console.log(file2, "file2");
    const data = await fs.promises.readFile(file2, "utf-8");
    if (data.length) {
      return JSON.parse(data);
    } else {
      return "not found";
    }
  }
  //   set a data in json
  async setUser(objecData) {
    //   console.log(getUsers());
    let data;
    let userData = await this.getUsers();

    if (userData) {
      userData.push(objecData);
      const newData = JSON.stringify(userData);
      data = await fs.promises
        .writeFile(file2, newData, "utf-8")
        .then(() => {
          return { status: 200, message: "add success" };
        })
        .catch((err) => {
          console.log(err);
          return { status: 500, message: "not save" };
        });
    }
    return data;
  }
  async limit(limit) {
    let userData = await this.setUser();
  }
}
let db = new Database();

// console.log(db.getUsers());
module.exports = db;
