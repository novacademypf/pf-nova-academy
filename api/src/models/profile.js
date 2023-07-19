const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Profile",
    {
      profileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING},
      photo:{type: DataTypes.STRING},
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
      },
      email: { type: DataTypes.STRING },
      status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      }
    }
    , {
      tableName: 'Profile',
      timestamps: false
    }
  );
};