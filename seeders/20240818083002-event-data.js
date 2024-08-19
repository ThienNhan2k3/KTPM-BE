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
    await queryInterface.bulkInsert('Events', [{
      id: 1,
      name: "Quiz",
      photo: "/public/images/events/defaultquiz.png",
      start: "2024-08-1T04:14:54",
      end: "2024-08-1T04:14:54",
      brandId: 1,
      gameInforId: null,
      type: "quiz",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 2,
      name: "Lacxi",
      photo: "/public/images/events/defaultquiz.png",
      start: "2024-08-1T04:14:54",
      end: "2024-08-1T04:14:54",
      brandId: 1,
      gameInforId: null,
      type: "lacxi",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Events', null, {});
  }
};
