const express = require("express")
const {connectDB}  = require("./connenct/mongoosedb")
require("dotenv").config()
let route = require("./loaderRoute")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
route.loadRoute(app)
connectDB()
const port = process.env.PORT;
app.listen(port,()=>{console.log("connect 12312312")})
