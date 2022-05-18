const express = require('express')
require('dotenv').config()
const userRoute = require('./routes/userRoute.js')
const cors = require('cors')

// connecting DB
require('./config/db.js')

const app = express()

// to avoid cors error
app.use(cors())

// json middleware
app.use(express.json())

// app.use(express.urlencoded({extended:true}))

// router middleware
app.use('/', userRoute)

//error handling middleware
app.use((err, req, res, next)=>{
    res.status(500).json({
        error:true,
        message:err.message,
        data:null
    })
})

// listening to the server
const PORT = process.env.PORT || 8001

app.listen(PORT,()=>{
    console.log(`Server listening at server ${PORT}`);
})

//multer -> library that can be used for uploading form data
