const expres = require("express");
const fs = require("fs");
const app = expres();
const port = process.env.PORT || 4500;

app.use(expres.static("/public"));

// app.get("/", (req, res) => {
//   fs.readFile("./data/data.json", (err, data) => {
//     console.log(data.toString("utf-8"));
//   });
// });

// const strdata = JSON.stringify(newData);

app.post("/post", (req, res) => {
  let userData;
  fs.readFile("./data/data.json", "utf-8", (err, data) => {
    userData = JSON.parse(data);
    if (userData) {
      userData.push(req.body);
      const newData = JSON.stringify(userData);
      fs.writeFile("./data/data.json", newData, "utf-8", (err) => {
        console.log(err);
      });
    }
  });
});

app.get("/", (req, res) => {
  let userData;
  fs.readFile("./data/data.json", "utf-8", (err, data) => {
    userData = JSON.parse(data);
    console.log(userData, "hello");
  });
});

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
