const { Model } = require("sequelize");

const { UserRole, GenderList } = require("../helpers/user.helper");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Course, Review, CoursePurchasement }) {
      this.hasMany(Course, { foreignKey: "teacher_id" });
      this.hasMany(Review, { foreignKey: "user_id" });
      this.hasMany(CoursePurchasement, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(Object.keys(GenderList)),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(Object.keys(UserRole)),
        allowNull: false,
      },
      profile_image: {
        type: DataTypes.STRING,
        defaultValue: "https://cdn-icons-png.flaticon.com/512/21/21104.png",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
