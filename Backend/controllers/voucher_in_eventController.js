//const { where } = require("sequelize");
//const { Voucher } = require("../models");



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

const { Voucher_In_Event, Voucher } = require("../models");

class voucher_in_eventController {
  // Get all by id_event
  static getVoucherByIdEvent = async (req, res) => {
    const id_event = req.params.uuid;
    try {
      const vouchers = await Voucher_In_Event.findAll({
        where: { id_event },
        include: [
          {
            model: Voucher,
            required: true,
          },
        ],
        order: [['id', 'ASC']],
      });
      //console.log(vouchers);
      return res.send(vouchers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };
  
  // Create voucher in event
  static create = async (req, res) => {
    const {
      id_voucher_code,
      id_event,
      exp_date,
      total_quantity
    }= req.body;
    console.log("ready to create voucher in event")
    try {
      const voucher = await Voucher_In_Event.create({
        id_voucher_code,
        id_event,
        exp_date,
        total_quantity,
        time_update: new Date(),
      });
      return res.json(voucher);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  // Update voucher in event
  static update = async (req, res) => {
    const id = req.params.uuid;
    const {
      id_voucher_code,
      id_event,
      exp_date,
      total_quantity
    }= req.body;
    console.log("Update voucher in event");
    try {
      const voucher = await Voucher_In_Event.findOne({
        where: { id },
      });
      if (!voucher) {
        return res.status(404).json({ error: "voucher not found" });
      }
      voucher.id_voucher_code = id_voucher_code;
      voucher.exp_date = exp_date;
      voucher.total_quantity = total_quantity;
      voucher.time_update = new Date();
      
      await voucher.save();
      return res.json(voucher);
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
module.exports = voucher_in_eventController;
