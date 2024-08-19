'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Accounts', [{
      id: 1,
      name: "James",
      email: "thnhan032@gmail.com",
      password: "123456",
      phone: "093251475",
      type: "user",
      status: "active",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    }, {
      id: 2,
      name: "Join",
      email: "abc2@gmail.com",
      password: "123456",
      phone: "093251475",
      type: "brand",
      status: "active",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    }, {
      id: 3,
      name: "Mia",
      email: "abc3@gmail.com",
      password: "123456",
      phone: "093251475",
      type: "admin",
      status: "active",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 4,
      name: "Thanh",
      email: "thnhan032@gmail.com",
      password: "123456",
      phone: "093251475",
      type: "user",
      status: "active",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 5,
      name: "Chi",
      email: "thnhan032@gmail.com",
      password: "123456",
      phone: "093251475",
      type: "user",
      status: "active",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
