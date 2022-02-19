"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comments.belongsTo(models.Users, { foreignKey: "ownerId", onDelete: "cascade" });
      models.Comments.belongsTo(models.Posts, { foreignKey: "postId", onDelete: "cascade" });
    }
  }
  Comments.init(
    {
      comments: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comments",
    }
  );
  return Comments;
};
