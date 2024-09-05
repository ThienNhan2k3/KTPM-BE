const ErrorResponse = require("../core/errorResponse");
const UserService = require("../services/userService");

const authenticate = async (req, res, next) => {
    const userId = req.headers["authorization"];
    if (userId) {
        const user = await UserService.findById(userId);
        if (user) {
            req.user = user;
            return next();
        }
    } else if(req.isAuthenticated()) {
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