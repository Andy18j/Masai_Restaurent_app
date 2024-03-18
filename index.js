const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { restaurentRouter } = require("./routes/restaurent.routes")
const { tableRouter } = require("./routes/table.routes")
const { menusRouter } = require("./routes/menus.routes")
require('dotenv').config()
const axios = require('axios')


const app = express()
app.use(express.json())
app.use(cors())


app.use('/user',userRouter)
app.use("/restaurent",restaurentRouter)
app.use('/table',tableRouter)
app.use('/menu',menusRouter)



app.get('/',(req,res)=>{
    res.send("Welcome to the Restrareant Schema Design")
})


app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Connected To The DB")

    }
    catch(err){
        console.log(err)
        console.log("NOT CONNECTED")
    }
    console.log(`port is running on the ${process.env.PORT}`)
})


