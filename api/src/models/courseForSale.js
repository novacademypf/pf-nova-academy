const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("courseForSale", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    totalRating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalRatings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ratingAverage: { // Nueva columna para almacenar el rating promedio
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  });
};





