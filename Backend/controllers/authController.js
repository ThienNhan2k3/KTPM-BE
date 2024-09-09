const { Brand } = require("../models");
const { Op } = require("@sequelize/core");
const SocketService = require("../services/socketService");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

  // Create a brand account
  static createAccountBrand = async (req, res) => {
    const { brand_name, email, password, phone, industry, address, lat, long } =
      req.body;

    let hashPassword = null;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return next(err);
      }
      hashPassword = hash;

      try {
        const [, created] = await Brand.findOrCreate({
          where: { [Op.or]: { brand_name, email } },
          defaults: {
            brand_name,
            email,
            password: hashPassword,
            phone,
            industry,
            address,
            gps: `${lat}, ${long}`,
            status: "Inactive",
            time_update: new Date(),
            avatar: "",
          },
        });

        if (!created) {
          let brand = await Brand.findOne({
            where: { brand_name, email },
          });
          if (brand) {
            return res.send({ message: "brand_name, email" });
          } else {
            brand = await Brand.findOne({ where: { brand_name } });
            if (brand) {
              return res.send({ message: "brand_name" });
            } else {
              return res.send({ message: "email" });
            }
          }
        } else {
          rabbitmqConnection.sendToTopicExchange("userTable", "refreshUserTable", {
            eventId: "roomAdmin", 
            message: "dbChange",
            data: `changed`
          })
          return res.send({ message: "Success" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
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
