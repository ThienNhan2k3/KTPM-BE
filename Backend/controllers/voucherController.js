// const { where } = require("sequelize");
// const { Voucher } = require("../models");

// // Get all vouchers
// exports.getAll = async (req, res) => {
//   try {
//     const vouchers = await Voucher.findAll();
//     return res.json(vouchers);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// // Get all vouchers that still active
// exports.getAll_active = async (req, res) => {
//   try {
//     const vouchers = await Voucher.findAll({
//       where: {
//         status: "Active",
//       },
//     });
//     return res.json(vouchers);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// // Create a voucher
// exports.create = async (req, res) => {
//   const {
//     voucher_name,
//     industry,
//     password,
//     email,
//     phone,
//     address,
//     gps,
//     status,
//     time_update,
//   } = req.body;
//   try {
//     const f_voucher = await voucher.findOne({
//       where: { email },
//     });
//     if (f_voucher) {
//       return res.status(404).json({ error: "This email already been used!" });
//     } else {
//       const voucher = await voucher.create({
//         voucher_name,
//         industry,
//         password,
//         email,
//         phone,
//         address,
//         gps,
//         status,
//         time_update,
//       });
//       return res.json(voucher);
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// // Activate a voucher
// exports.activate = async (req, res) => {
//   const id = req.params.uuid;
//   try {
//     const voucher = await voucher.findOne({
//       where: { id },
//     });
//     if (!voucher) {
//       return res.status(404).json({ error: "voucher not found" });
//     }
//     if (voucher.status === "Active") {
//       return res.status(400).json({ error: "voucher is already active" });
//     }

//     voucher.status = "Active";
//     voucher.time_update = new Date(); // Update the time_update field to the current time
//     await voucher.save();

//     return res.json({ message: "voucher activated successfully", voucher });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// // Find an voucher by UUID
// exports.getByUUID = async (req, res) => {
//   const id = req.params.uuid;
//   try {
//     const voucher = await voucher.findOne({
//       where: { id },
//     });
//     return res.json(voucher);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// // Update an voucher
// exports.update = async (req, res) => {
//   const id = req.params.uuid;
//   const {
//     voucher_name,
//     industry,
//     password,
//     email,
//     phone,
//     address,
//     gps,
//     status,
//     time_update,
//   } = req.body;
//   try {
//     const voucher = await voucher.findOne({
//       where: { id },
//     });
//     if (!voucher) {
//       return res.status(404).json({ error: "voucher not found" });
//     }
//     voucher.voucher_name = voucher_name;
//     voucher.industry = industry;
//     voucher.password = password;
//     voucher.email = email;
//     voucher.phone = phone;
//     voucher.address = address;
//     voucher.gps = gps;
//     voucher.status = status;
//     voucher.time_update = time_update;

//     await voucher.save();
//     return res.json(voucher);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

// // Delete an voucher
// exports.delete = async (req, res) => {
//   const id = req.params.uuid;
//   try {
//     const voucher = await voucher.findOne({
//       where: { id },
//     });

//     if (!voucher) {
//       return res.status(404).json({ error: "voucher not found" });
//     }

//     await voucher.destroy();
//     return res.json({ message: "voucher deleted successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

const { Voucher } = require("../models");
const { Op } = require("@sequelize/core");
const { uploadToImgur } = require("../middlewares/uploadFile");

class voucherController {
  // Get all vouchers of brand
  static getVoucherByIdBrand = async (req, res) => {
    const id_brand = req.params.id_brand;
    let vouchers = null;

    try {
      vouchers = await Voucher.findAll({
        where: {
          id_brand,
          status: {
            [Op.ne]: "Delete", // Điều kiện lấy tất cả các user có status khác "Delete"
          },
        },
      });
      return res.send(vouchers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Get all vouchers
  static getAll = async (req, res) => {
    //let vouchers = null;

    try {
      const vouchers = await Voucher.findAll();
      return res.json(vouchers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Get all vouchers that still active
  static getAll_active = async (req, res) => {
    let vouchers = null;
    try {
      vouchers = await Voucher.findAll({
        where: {
          status: "Active",
        },
      });
      return res.json(vouchers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Create a voucher
  static createVoucher = async (req, res) => {
    const { voucher_code, max_discount, value, description, type, status } =
      JSON.parse(req.body.my_data);

    // console.log(req.body.my_data);
    // console.log(req.file);

    let imgurLink = null;

    if (req.file) {
      // Upload the file to Imgur
      imgurLink = await uploadToImgur(req.file.buffer);
    } else {
      imgurLink = "";
    }

    try {
      const [, created] = await Voucher.findOrCreate({
        where: { voucher_code },
        defaults: {
          voucher_code,
          id_brand: "05e44252-ff08-4a0a-b238-93cf3c5382a6",
          image: imgurLink,
          max_discount,
          value,
          description,
          type,
          status,
          time_update: new Date(),
        },
      });

      if (!created) {
        return res.send({ message: "voucher_code" });
      } else {
        return res.send({ message: "Success" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Update a voucher
  static updateVoucher = async (req, res) => {
    const voucher_code = req.params.voucher_code;
    const body = req.body;

    console.log(voucher_code);
    console.log(body.status);

    let voucher = null;

    try {
      voucher = await Voucher.findOne({
        where: { voucher_code },
      });

      if (!voucher) {
        return res.status(404).json({ error: "Voucher not found" });
      }

      if (voucher.status !== body.status) {
        voucher.status = body.status;
        voucher.time_update = new Date();

        await voucher.save();

        return res.send({ message: "Success" });
      } else {
        return res.send({ message: "Fail" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  //   // Delete a voucher
  static deleteVoucher = async (req, res) => {
    const voucher_code = req.params.voucher_code;

    let voucher = null;

    try {
      voucher = await Voucher.findOne({
        where: { voucher_code },
      });

      if (!voucher) {
        return res.status(404).json({ error: "Voucher not found" });
      }

      voucher.status = "Delete";
      voucher.time_update = new Date();

      await voucher.save();

      return res.send({ message: "Success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  //   // Find an account by UUID
  //   static getAccountByUUID = async (req, res) => {
  //     const id = req.params.uuid;
  //     try {
  //       const account = await User.findOne({
  //         where: { id },
  //       });
  //       return res.json(account);
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     }
  //   };
}

module.exports = voucherController;
