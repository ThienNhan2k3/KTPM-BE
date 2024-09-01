const { Users, Brands } = require("../models");
const { Op } = require("@sequelize/core");

class accountController {
  // Get all accounts
  static getAllAccounts = async (req, res) => {
    const type = req.params.type;
    let accounts = null;

    try {
      if (type == "user") {
        accounts = await Users.findAll();
      } else {
        accounts = await Brands.findAll();
      }
      return res.send(accounts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Create an user account
  static createAccountUser = async (req, res) => {
    const {
      full_name,
      user_name,
      dob,
      email,
      password,
      gender,
      fb_acc,
      phone,
      type,
      status,
    } = req.body;
    try {
      const [user, created] = await Users.findOrCreate({
        where: { [Op.or]: { user_name, email } },
        defaults: {
          full_name,
          user_name,
          avatar: "",
          dob,
          email,
          password,
          gender,
          fb_acc,
          phone,
          type,
          status,
          time_update: new Date(),
        },
      });
      return res.send(created);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Find an account by UUID
  static getAccountByUUID = async (req, res) => {
    const id = req.params.uuid;
    try {
      const account = await Users.findOne({
        where: { id },
      });
      return res.json(account);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Update an account
  static updateAccount = async (req, res) => {
    const type = req.params.type;
    const id = req.params.uuid;
    const body = req.body;

    let account = null;

    try {
      if (type == "user") {
        account = await Users.findOne({
          where: { id },
        });
      } else {
        account = await Brands.findOne({
          where: { id },
        });
      }

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      account.status = body.status;

      await account.save();

      return res.send(account);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Delete an account
  static deleteAccount = async (req, res) => {
    const type = req.params.type;
    const id = req.params.uuid;

    try {
      if (type == "user") {
        account = await Users.findOne({
          where: { id },
        });
      } else {
        account = await Brands.findOne({
          where: { id },
        });
      }

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      await account.destroy();
      return res.json({ message: "Account deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };
}

module.exports = accountController;
