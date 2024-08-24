const AuthService = require("../services/authService");

class AuthController {
    static postLogin = async (req, res, next) => {
        // req.session.accountId = req.user.id;
        // const nextUrl = req.session.nextUrl || "";
       
    
        // if (nextUrl.trim() !== '') {
        //     res.redirect(nextUrl);
        // }
        console.log(req.user.type);
        if (req.user.type == null) {
            return res.json({
                code: 200, 
                redirect: "/brand"
            });
        }
        else if (req.user.type !== 'Người chơi') {
            return res.json({
                code: 200, 
                redirect: "/admin"
            });
        }
        return res.json({
            code: 200
        })
       
    };
  
}

module.exports = AuthController;