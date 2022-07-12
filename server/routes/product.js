const express = require('express');

const router = express.Router();
//middleware routes
const { authCheck, adminCheck } = require("../middleware/auth");

const {create} = require('../controller/product')

router.post("/product", authCheck, adminCheck, create);



module.exports = router;