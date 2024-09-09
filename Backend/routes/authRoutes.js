const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const authController = require("../controllers/authController");
const LocalStrategy = require("passport-local").Strategy;
const { User, Brand } = require("../models");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  authController.postLogin
);

router.post("/create/brand", authController.createAccountBrand);

router.get("/login", (req, res) => {
  res.json({
    code: 400,
    message: "Tài khoản hoặc mật khẩu không hợp lệ",
  });
});

router.get("/logout", authController.logout);

passport.serializeUser(function (account, done) {
  done(null, account.id);
});

passport.deserializeUser(async function (accountId, done) {
  console.log(User);
  try {
    let user = await User.findOne({
      where: {
        id: accountId,
      },
    });

    if (!user) {
      user = await Brand.findOne({
        where: {
          id: accountId,
        },
      });
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    console.error(err);
    done(err);
  }
});

const verifyCallback = async (email, password, done) => {
  email = email ? email.trim() : "";
  if (!email) {
    return done(null, false, {
      message: JSON.stringify({
        flag: "email",
        content: "Tên tài khoản hoặc email bị bỏ trống",
      }),
    });
  }

  try {
    let account = await User.findOne({
      where: {
        email: email,
        status: "Active",
      },
    });

    if (!account) {
      account = await Brand.findOne({
        where: {
          email: email,
          status: "Active",
        },
      });
    }

    if (!account) {
      return done(null, false);
    }
    const isMatch = await bcrypt.compare(password, account.password);
    // const isMatch = password === account.password;
    if (!isMatch) {
      return done(null, false);
    }
    return done(null, account);
  } catch (err) {
    console.log(err);
    return done(err);
  }
};

const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  verifyCallback
);
passport.use(strategy);

module.exports = router;
