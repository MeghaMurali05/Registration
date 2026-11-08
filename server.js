const express=require('express')
const mongooose=require('mongoose')
const loginroutes=require('./routes/loginRoute')
const dotenv=require('dotenv').config()
const app=express()
const port=8080
app.use(express.json())

mongooose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB Connected")
})
.catch((error)=>{
    console.log(error)
})


app.use('/api',loginroutes)



app.listen(port,()=>{
    console.log("Server is running on", port)
})