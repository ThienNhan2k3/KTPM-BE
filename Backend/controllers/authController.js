class AuthController {
  static postLogin = async (req, res, next) => {
    // req.session.accountId = req.user.id;
    // const nextUrl = req.session.nextUrl || "";

    // if (nextUrl.trim() !== '') {
    //     res.redirect(nextUrl);
    // }
    if (req.user.type == null) {
      const user = {
        id: req.user.id,
        type: "brand",
      };
      res.cookie("user", user);
      return res.json({
        code: 200,
        redirect: "/brand",
      });
    } else if (req.user.type !== "Người chơi") {
      const user = {
        id: req.user.id,
        type: "admin",
      };
      res.cookie("user", user);
      return res.json({
        code: 200,
        redirect: "/admin",
      });
    }
    return res.json({
      code: 200,
    });
  };

  static logout = async (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.clearCookie("user");
      res.json({
        code: 200,
        metadate: "Logout successfully",
      });
    });
  };
}

module.exports = AuthController;
