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
    await queryInterface.bulkInsert('Items', [{
      id: 1,
      itemName: "A",
      itemImageUrl: "/public/images/items/A.png",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    }, {
      id: 2,
      itemName: "B",
      itemImageUrl: "/public/images/items/B.png",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 3,
      itemName: "C",
      itemImageUrl: "/public/images/items/C.png",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"           
    },{
      id: 4,
      itemName: "D",
      itemImageUrl: "/public/images/items/D.png",
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    },{
      id: 5,
      itemName: "E",
      itemImageUrl: "/public/images/items/E.png",
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
