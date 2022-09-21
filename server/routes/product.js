const express = require('express');

const router = express.Router();
//middleware routes
const { authCheck, adminCheck } = require("../middleware/auth");

const {create,listall,remove,read} = require('../controller/product')

router.post("/products", authCheck, adminCheck, create);
router.get("/products/:count",  listall);
router.delete("/product/:slug",authCheck,adminCheck,remove)
router.get("/product/:slug",read)



module.exports = router;    