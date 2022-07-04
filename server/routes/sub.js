const express = require("express");

const router = express.Router();

//middleware routes
const { authCheck, adminCheck } = require("../middleware/auth");

const { create,read,update,remove,list} = require("../controller/sub");

router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list);
router.get("/sub/:slug",  read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.delete("/sub/:slug", authCheck, adminCheck, remove);


module.exports = router;
