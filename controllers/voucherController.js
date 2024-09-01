const { Vouchers } = require("../models");

class voucherController {
  // Get all accounts
  static getVoucherByIdBrand = async (req, res) => {
    const id_brand = req.params.id_brand;
    let vouchers = null;

    try {
      vouchers = await Vouchers.findAll({ where: { id_brand } });
      return res.send(vouchers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  //   // Create an account
  //   static createAccount = async (req, res) => {
  //     const { name, email, password, phone, type, status } = req.body;
  //     try {
  //       const f_account = await Users.findOne({
  //         where: { email },
  //       });
  //       if (f_account) {
  //         return res.status(404).json({ error: "Account already exist!" });
  //       } else {
  //         const account = await Users.create({
  //           name,
  //           email,
  //           password,
  //           phone,
  //           type,
  //           status,
  //         });
  //         return res.json(account);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     }
  //   };

  //   // Find an account by UUID
  //   static getAccountByUUID = async (req, res) => {
  //     const id = req.params.uuid;
  //     try {
  //       const account = await Users.findOne({
  //         where: { id },
  //       });
  //       return res.json(account);
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     }
  //   };

  //   // Update an account
  //   static updateAccount = async (req, res) => {
  //     const id = req.params.uuid;
  //     const { name, email, password, phone, type, status } = req.body;
  //     try {
  //       const account = await Users.findOne({
  //         where: { id },
  //       });
  //       if (!account) {
  //         return res.status(404).json({ error: "Account not found" });
  //       }
  //       account.name = name;
  //       account.email = email;
  //       account.password = password;
  //       account.phone = phone;
  //       account.type = type;
  //       account.status = status;

  //       await account.save();
  //       return res.json(account);
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     }
  //   };

  //   // Delete an account
  //   static deleteAccount = async (req, res) => {
  //     const id = req.params.uuid;
  //     try {
  //       const account = await Users.findOne({
  //         where: { id },
  //       });

  //       if (!account) {
  //         return res.status(404).json({ error: "Account not found" });
  //       }

  //       await account.destroy();
  //       return res.json({ message: "Account deleted successfully" });
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     }
  //   };
}
module.exports = voucherController;
