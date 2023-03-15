const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
require('./conn')
app.use(express.json())
app.use(require('./router/auth'))
const PORT = process.env.PORT;


app.listen(PORT,()=>{
  console.log(`server is opne at localhost:${PORT}`)
})

