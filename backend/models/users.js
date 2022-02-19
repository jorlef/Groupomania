"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Users.hasMany(models.Posts);
      // models.Users.hasMany(models.Comments);
    }

    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  }
  Users.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a first name" },
          notEmpty: {
            args: true,
            msg: "first name field must not be empty",
          },
          is: {
            args: ["^[a-z -']+$", "i"],
            msg: "Only letters allowed",
          },
          len: {
            args: [2, 32],
            msg: "String length is not in this range",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a first name" },
          notEmpty: {
            args: true,
            msg: "first name field must not be empty",
          },
          is: {
            args: ["^[a-z -']+$", "i"],
            msg: "Only letters allowed",
          },
          len: {
            args: [2, 32],
            msg: "String length is not in this range",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "User must have a mail" },
          notEmpty: {
            args: true,
            msg: "mail field must not be empty",
          },
          isEmail: {
            args: true,
            msg: "email is not formatted as an email",
          },
          len: {
            args: [6, 64],
            msg: "email length is not in this range",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a password" },
          notEmpty: { msg: "password field must not be empty" },
          max: {
            args: 128,
            msg: "email length is not in this range",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      profil_picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "http://127.0.0.1:5000/images/profils/default.jpg",
      },
      inactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "Users",
    }
  );
  return Users;
};
