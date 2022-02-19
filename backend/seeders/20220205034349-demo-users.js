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
      "users",
      [
        {
          uuid: "5ebcf74d-3593-4212-a9ee-07815eb9d52d",
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@gmail.com",
          password: "$2a$07$P55J.EvpKJF4rxvWer01g.3HksgYZcP10hSN0SjeFqmQF6vSRxF7G",
          role: "user",
          isAdmin: 0,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          uuid: "4c4835de-415c-4867-8cbd-375e7c4042f0",
          first_name: "admin",
          last_name: "admin",
          email: "admin1517@gmail.com",
          password: "$2a$07$XRYwXcZAqRq3kSINNw7JT.qHtzpb26pWEtGSxl0KuveZIMYDZ7L3a",
          role: "admin",
          isAdmin: 1,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          uuid: "a28ab2a6-0c8c-44c5-a05f-0809be317eb1",
          first_name: "Jane",
          last_name: "Doe",
          email: "janedoe@gmail.com",
          password: "$2a$07$O8hyeTOcLaVrWGmbKkvptOeN5b5gvhUTb08Hsjud9uICHrPVLQ4Ha",
          role: "user",
          isAdmin: 0,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          uuid: "9d159feb-4096-43d9-9039-f00a5b854e6f",
          first_name: "gerard",
          last_name: "dupond",
          email: "gerarddupond@gmail.com",
          password: "$2a$07$mQQKbhiB/jR0lfqr8UTVxuJKYVXAsr996Fmqeb1TKAfbTmDGGodU2",
          role: "user",
          isAdmin: 0,
          createdAt: "2022-02-05 03:58:03.200",
          updatedAt: "2022-02-05 03:58:03.200",
        },
        {
          uuid: "9ff3636b-2a4f-4571-8b9b-3651686dbaae",
          first_name: "ihave",
          last_name: "noidea",
          email: "ihavenoidea@gmail.com",
          password: "$2a$07$e.JDNTYx.J2zus2sD7KPGuhuVx4a/N2xpbOqo7RyH0/DT9NLaJrca",
          role: "user",
          isAdmin: 0,
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
