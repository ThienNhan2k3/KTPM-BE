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
    await queryInterface.bulkInsert('ItemQuantities', [{
      id: 1,
      quantity: 1,
      itemId: 1,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"  
    }, {
      id: 2,
      quantity: 1,
      itemId: 2,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"  
    },{
      id: 3,
      quantity: 1,
      itemId: 3,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"  
    },{
      id: 4,
      quantity: 1,
      itemId: 4,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"  
    }, {
      id: 5,
      quantity: 1,
      itemId: 5,
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
    await queryInterface.bulkDelete('ItemQuantities', null, {});
  }
};
