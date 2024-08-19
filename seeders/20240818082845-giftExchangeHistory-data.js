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
    await queryInterface.bulkInsert('GiftExchangesHistory', [{
      id: 1,
      receiverId: 1,
      eventId: 1,
      exchangeTime:"2024-08-1T04:14:54",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"  
    },  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('GiftExchangesHistory', null, {});
  }
};
