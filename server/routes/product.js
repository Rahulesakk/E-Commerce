const express = require('express');

const router = express.Router();
//middleware routes
const { authCheck, adminCheck } = require("../middleware/auth");

const {create,listall,remove,read,update,list,productscount} = require('../controller/product')

router.post("/products", authCheck, adminCheck, create);
router.get("/products/:count",  listall);
router.delete("/product/:slug",authCheck,adminCheck,remove)
router.get("/product/:slug",read)
router.put("/product/:slug",authCheck,adminCheck,update)

router.post("/product",list);
router.get("/getproducts/total",(req,res,next)=> {
    console.log('pppppppppppppppppppppppppppppppppppp')
    next();
},productscount)



module.exports = router;    