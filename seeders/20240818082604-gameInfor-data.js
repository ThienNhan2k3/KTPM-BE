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

    await queryInterface.bulkInsert('GameInfors', [{
      id: 1,
      name: 'Quiz',
      types: "['Giai do', 'tri tue']",
      photo: "/public/images/gameInfor/defaultquiz.png",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"  
    }, {
      id: 2,
      name: 'lacxi',
      types: "['Giai tri', 'tri tue']",
      photo: "/public/images/gameInfor/defaultlacxi.png",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"  
    }], {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('GameInfors', null, {});
     */
    await queryInterface.bulkDelete('GameInfors', null, {});
  }
};
