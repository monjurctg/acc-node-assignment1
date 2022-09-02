const userFuntion = require("../../controlers/user-controler");
const fieldValidation = require("../../middlewares/userFiledValidation");

const router = require("express").Router();

router.get("/all", userFuntion.getAllUser);
router.get("/random", userFuntion.randomUser);
router.post("/save", fieldValidation, userFuntion.saveUser);

module.exports = router;
