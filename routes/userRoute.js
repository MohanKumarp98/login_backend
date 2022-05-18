const express = require('express')
const userRoute = express.Router()
const userControl = require('../controller/userControl.js')

//resgiter route
userRoute.post('/register', userControl.userRegister)
userRoute.post('/login', userControl.userLogin)

module.exports = userRoute
