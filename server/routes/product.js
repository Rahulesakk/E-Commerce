const express = require('express');

const router = express.Router();
//middleware routes
const { authCheck, adminCheck } = require("../middleware/auth");

const {create,read} = require('../controller/product')

router.post("/products", authCheck, adminCheck, create);
router.get("/products",  read);



module.exports = router;    