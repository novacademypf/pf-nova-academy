const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("courseRating", {
    idCourseRating: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    review:{
        type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0.5,
        max: 5.0,
      },
    },
  });
};
