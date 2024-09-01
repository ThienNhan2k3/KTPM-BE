const ErrorResponse = require("../core/errorResponse")

const authenticate = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.json({
        code: 200,
        metadata: {
            login: false,
            permission: false,
        }
    })
}

const isAdmin = (req, res, next) => {
    console.log(req.user);
}


module.exports = {authenticate, isAdmin};