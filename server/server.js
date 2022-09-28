const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require('fs');
require('dotenv').config()



//app.
const app = express();

//dd
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
})
.then(()=>{
    console.log('DATA BASE CONNECTED SUCCESSFULLY...')
})
.catch(err => console.log(`DB Connection ERR ${err}`))

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors());

//routes middleware
fs.readdirSync('./routes').map((r)=>{
    console.log('11111111111111111111111111111',r)
    app.use("/api",require("./routes/"+ r))
})
//routes



//port
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server ius running in the port ${port}`)
})