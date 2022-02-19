"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          comments: "ahah verry funny",
          ownerId: 2,
          postId: 3,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          comments: "ahah verry funny 2",
          ownerId: 2,
          postId: 3,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          comments: "hihi verry funny",
          ownerId: 1,
          postId: 3,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          comments: "hoho verry funny",
          ownerId: 3,
          postId: 1,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("comments", null, {});
  },
};
