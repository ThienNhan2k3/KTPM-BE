const { User, Brand } = require("../models");
const { Op } = require("@sequelize/core");
const { uploadToImgur } = require("../middlewares/uploadFile");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class accountController {
  // Get all accounts
  static getAllAccounts = async (req, res) => {
    const type = req.params.type;

    let accounts = null;

    try {
      if (type == "user") {
        accounts = await User.findAll(
          {
            where: {
              status: {
                [Op.ne]: "Delete", // Điều kiện lấy tất cả các user có status khác "Delete"
              },
            },
          },
          {
            order: ["id"],
          }
        );
      } else {
        accounts = await Brand.findAll(
          {
            where: {
              status: {
                [Op.ne]: "Delete", // Điều kiện lấy tất cả các user có status khác "Delete"
              },
            },
          },
          {
            order: ["id"],
          }
        );
      }
      return res.send(accounts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Create an user account
  static createAccountUser = async (req, res, next) => {
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
    } = JSON.parse(req.body.my_data);

    // console.log(req.body.my_data);
    // console.log(req.file);

    let hashPassword = null;
    let imgurLink = null;

    if (req.file) {
      // Upload the file to Imgur
      imgurLink = await uploadToImgur(req.file.buffer);
    } else {
      imgurLink = "";
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return next(err);
      }
      hashPassword = hash;

      try {
        const [, created] = await User.findOrCreate({
          where: { [Op.or]: { user_name, email } },
          defaults: {
            full_name,
            user_name,
            avatar: imgurLink,
            dob,
            email,
            password: hashPassword,
            gender,
            fb_acc,
            phone,
            type,
            status,
            time_update: new Date(),
          },
        });

        if (!created) {
          let user = await User.findOne({
            where: { user_name, email },
          });
          if (user) {
            return res.send({ message: "user_name, email" });
          } else {
            user = await User.findOne({ where: { user_name } });
            if (user) {
              return res.send({ message: "user_name" });
            } else {
              return res.send({ message: "email" });
            }
          }
        } else {
          return res.send({ message: "Success" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
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
          return res.send({ message: "Success" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    });
  };

  // Find an account by UUID
  static getAccountByUUID = async (req, res) => {
    const type = req.params.type;
    const id = req.params.uuid;

    let account = null;

    try {
      if (type === "user") {
        account = await User.findOne({
          where: { id },
        });
      } else {
        account = await Brand.findOne({
          where: { id },
        });
      }
      return res.send(account);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Update an account
  static updateStatusAccount = async (req, res) => {
    const type = req.params.type;
    const id = req.params.uuid;
    const body = req.body;

    let account = null;

    try {
      if (type == "user") {
        account = await User.findOne({
          where: { id },
        });
      } else {
        account = await Brand.findOne({
          where: { id },
        });
      }

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      if (account.status !== body.status) {
        account.status = body.status;
        account.time_update = new Date();

        await account.save();

        return res.send({ message: "Success" });
      } else {
        return res.send({ message: "Fail" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  static updateInformationUser = async (req, res) => {
    const id = req.params.uuid;
    const { full_name, dob, gender, fb_acc, phone } = JSON.parse(
      req.body.my_data
    );

    let imgurLink = null;

    if (req.file) {
      // Upload the file to Imgur
      imgurLink = await uploadToImgur(req.file.buffer);
    }

    try {
      const user = await User.findOne({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: "Account not found" });
      }

      user.full_name = full_name;
      user.dob = dob;
      user.gender = gender;
      user.fb_acc = fb_acc;
      user.phone = phone;
      if (imgurLink !== null) {
        user.avatar = imgurLink;
      }
      user.time_update = new Date();

      await user.save();

      return res.send({ message: "Success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  static updateInformationBrand = async (req, res) => {
    const id = req.params.uuid;
    const { phone, industry, address, lat, long } = JSON.parse(
      req.body.my_data
    );

    let imgurLink = null;

    if (req.file) {
      // Upload the file to Imgur
      imgurLink = await uploadToImgur(req.file.buffer);
    }

    try {
      const brand = await Brand.findOne({
        where: { id },
      });

      if (!brand) {
        return res.status(404).json({ error: "Account not found" });
      }

      brand.phone = phone;
      brand.industry = industry;
      brand.address = address;
      brand.gps = `${lat}, ${long}`;
      if (imgurLink !== null) {
        brand.avatar = imgurLink;
      }
      brand.time_update = new Date();

      await brand.save();

      return res.send({ message: "Success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  static updatePasswordAccount = async (req, res) => {
    const type = req.params.type;
    const id = req.params.uuid;
    const body = req.body;

    console.log(body);

    let account = null;
    let hashPassword = null;

    try {
      if (type == "user") {
        account = await User.findOne({
          where: { id },
        });
      } else {
        account = await Brand.findOne({
          where: { id },
        });
      }

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      const isMatch = await bcrypt.compare(body.old_password, account.password);

      if (isMatch) {
        bcrypt.hash(body.new_password1, saltRounds, async (err, hash) => {
          if (err) {
            return next(err);
          }
          hashPassword = hash;

          account.password = hashPassword;
          account.time_update = new Date();

          await account.save();

          return res.send({ message: "Success" });
        });
      } else {
        return res.send({ message: "Fail" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Delete an account
  static deleteAccount = async (req, res) => {
    const type = req.params.type;
    const id = req.params.uuid;

    let account = null;

    try {
      if (type == "user") {
        account = await User.findOne({
          where: { id },
        });
      } else {
        account = await Brand.findOne({
          where: { id },
        });
      }

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      account.status = "Delete";
      account.time_update = new Date();

      await account.save();

      return res.send({ message: "Success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };
}

module.exports = accountController;
