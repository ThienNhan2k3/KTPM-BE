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
    await queryInterface.bulkInsert('VoucherTypes', [{
      id: 1,
      photoUrl: "/",
      description: "sfajsdfkjaksldfasdf",
      status: "active",
      percent: 10,
      maxValue: 100000,
      started_date: "2024-08-30T04:14:54",
      expired_date: "2024-09-30T04:14:54",
      idUser: 1,
      idEvent: 1,
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
    await queryInterface.bulkDelete('VoucherTypes', null, {});
  }
};
