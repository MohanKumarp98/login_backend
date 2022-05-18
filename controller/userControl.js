const registerSchema = require('../models/registerSchema.js')
const bcrypt = require('bcrypt')

//registeration controller
const userRegister = async (req, res, next) => {
    console.log("-----------");
    console.log(req.body);

    //destructuring the response
    const { fname, email, lname, password } = req.body

    //checking for already existing data
    const emails = await registerSchema.findOne({ email })
    console.log(emails);
    //if already exist show error status
    if (emails) {
        res.status(409).json({
            error: false,
            message: 'You are already registered',
            data: null
        })
    } else {
        //else -> new user -> register process
        //hashing and salting password
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const passHash = await bcrypt.hash(password, salt)
        // console.log(passHash);

        //inserting data using try catch to database 
        try {
            const registerData = await registerSchema.insertMany({
                fname,
                lname,
                email,
                password: passHash
            })
            //sending success msg as a response
            res.status(201).json({
                error: false,
                message: 'successfully registered',
                data: registerData
            })
        } catch (err) {
            next(err)
        }
    }
}

//login
const userLogin = async (req, res, next) => {
    const { email, password } = req.body
    console.log("-----------------------");
    console.log(req.body)
    //Authentication
    try {
        const userValid = await registerSchema.findOne({ email })
        console.log(userValid);
        //if valid login credentials 
        if (userValid) {
            //comparing hased password
            const pass = await bcrypt.compare(password, userValid.password)
            //if hased password matchs
            if (pass) {

                res.status(200).json({
                    error: false,
                    message: 'successfully Login',
                    data: {
                        userValid
                    }
                })
            } else {
                res.status(403).json({
                    error: true,
                    message: 'Password not match',
                    data: null
                })
            }
        } else {
            res.status(401).json({
                error: true,
                message: 'Credentials does not match',
                data: null
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userRegister,
    userLogin
}