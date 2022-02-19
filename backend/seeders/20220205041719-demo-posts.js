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
      "posts",
      [
        // {
        //   title: "first john post",
        //   content: "this is my first post",
        //   ownerId: "5ebcf74d-3593-4212-a9ee-07815eb9d52d",
        //   attachment: "http://127.0.0.1:5000/images/posts/AApUF2f1644035408288.jpg",
        //   createdAt: "2022-02-05 03:58:03.200",
        //   updatedAt: "2022-02-05 03:58:03.200",
        // },
        // {
        //   title: "second john post",
        //   content: "this is my second post",
        //   ownerId: "5ebcf74d-3593-4212-a9ee-07815eb9d52d",
        //   attachment: null,
        //   createdAt: "2022-02-05 03:58:03.200",
        //   updatedAt: "2022-02-05 03:58:03.200",
        // },
        // {
        //   title: "first admin post",
        //   content: "this is my first post",
        //   ownerId: "4c4835de-415c-4867-8cbd-375e7c4042f0",
        //   attachment: null,
        //   createdAt: "2022-02-05 03:58:03.200",
        //   updatedAt: "2022-02-05 03:58:03.200",
        // },
        // {
        //   title: "second admin post",
        //   content: "this is my second post",
        //   ownerId: "4c4835de-415c-4867-8cbd-375e7c4042f0",
        //   attachment: null,
        //   createdAt: "2022-02-05 03:58:03.200",
        //   updatedAt: "2022-02-05 03:58:03.200",
        // },
        // {
        //   title: "blip bloup",
        //   content: "blip blip",
        //   ownerId: "a28ab2a6-0c8c-44c5-a05f-0809be317eb1",
        //   attachment: null,
        //   createdAt: "2022-02-05 03:58:03.200",
        //   updatedAt: "2022-02-05 03:58:03.200",
        // },
        {
          title: "first john post",
          content: "this is my first post",
          ownerId: 1,
          attachment: null,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          title: "second john post",
          content: "this is my second post",
          ownerId: 1,
          attachment: null,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          title: "first admin post",
          content: "this is my first post",
          ownerId: 2,
          attachment: null,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          title: "second admin post",
          content: "this is my second post",
          ownerId: 2,
          attachment: null,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          title: "blip bloup",
          content: "blip blip",
          ownerId: 3,
          attachment: null,
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
    await queryInterface.bulkDelete("posts", null, {});
  },
};
