const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
    //geting token from headers
    const token = req.headers['authorization'].split(' ')[1]
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    // console.log(payload);

    //if token valid and role is admin then give authorization
    const role = payload.role
    if (payload) {
        if (role === 'admin') {
            next()
        } else {
            res.status(403).json({
                error: false,
                message: 'not authorization',
                data: role
            })
        }
    } else {
        res.status(403).json({
            error: false,
            message: 'not authorization',
            data: role
        })
    }
}

module.exports = {
    adminAuth
}