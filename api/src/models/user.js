const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin','user'),
        defaultValue:'user',
        allowNull: false
      },

      status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      }
      
    }, {
      tableName: 'User',
      timestamps: false
    }
  );
};

