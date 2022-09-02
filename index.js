const express = require("express");
const fs = require("fs");
const cors = require("cors");
const router = require("./routes/v1/user");
const db = require("./utils/functions");
const app = express();
const port = process.env.PORT || 4500;

app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(cors());
app.use("/data", express.static(__dirname + "/data"));

app.use("/user", router);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
