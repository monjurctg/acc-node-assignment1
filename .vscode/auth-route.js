const expres= require("express")

const router = expres.Router()

router.route("/").get()

module.exports = router