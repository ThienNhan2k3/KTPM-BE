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
    await queryInterface.bulkInsert('Playturns', [{
      id: 1,
      idUser: 1,
      idEvent: 1,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 2,
      idUser: 1,
      idEvent: 2,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 3,
      idUser: 4,
      idEvent: 1,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 4,
      idUser: 4,
      idEvent: 2,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 5,
      idUser: 5,
      idEvent: 1,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 6,
      idUser: 5,
      idEvent: 2,
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
    await queryInterface.bulkDelete('Playturns', null, {});
  }
};
