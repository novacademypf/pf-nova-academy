const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "UserGoogle",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM('user','admin'),
        defaultValue:'user',
        allowNull: false
      }
    },
    { timestamps: false }
  );
};




