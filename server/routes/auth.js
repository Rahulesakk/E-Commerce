const express = require('express');

const router = express.Router();

//middleware routes
const {authCheck} = require('../middleware/auth')

const {createOrUpdateUser} = require('../controller/auth')
router.post("/create-or-update-user",authCheck, createOrUpdateUser);



module.exports = router;