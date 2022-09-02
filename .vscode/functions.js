const fs = require("fs");

function setUser(objecData) {
  //   console.log(getUsers());
  //   console.log(userData, "kfkd");
  //   if (userData) {
  //     userData.push(objecData);
  //     const newData = JSON.stringify(userData);
  //     fs.writeFile("../data/data.json", newData, "utf-8", (err) => {
  //       console.log(err);
  //     });
  //   }
}
setUser({ name: "jello" });

class Database {
  getUsers() {
    fs.readFile("../data/data.json", "utf-8", async (err, data) => {
      let parsData = await JSON.parse(data);

      return parsData;
    });
  }
}

let data = new Database();
console.log(data.getUsers());
module.exports = new Database();
