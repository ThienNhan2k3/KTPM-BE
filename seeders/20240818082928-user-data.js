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
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      gender: "male",
      dob: "2003-08-1",
      username: "username",
      avatarUrl: "/public/images/avatarAccount/defaultAvatar.png",
      accountId: 1,
      warehouseId: 1,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    }, {
      id: 2,
      gender: "male",
      dob: "2003-08-1",
      username: "username",
      avatarUrl: "/public/images/avatarAccount/defaultAvatar.png",
      accountId: 4,
      warehouseId: 2,
      updatedAt:"2024-08-1T04:14:54",
      createdAt:"2024-08-1T04:14:54"     
    }, {
      id: 3,
      gender: "female",
      dob: "2003-08-1",
      username: "username",
      avatarUrl: "/public/images/avatarAccount/defaultAvatar.png",
      accountId: 5,
      warehouseId: 3,
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
