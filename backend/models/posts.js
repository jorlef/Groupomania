"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(models.Comments, { foreignKey: "postId" }, { onDelete: "cascade" });
      models.Posts.belongsTo(models.Users, { foreignKey: "ownerId", onDelete: "cascade" });
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Posts",
    }
  );
  return Posts;
};
