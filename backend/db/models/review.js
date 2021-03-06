'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User,{foreignKey:"authorId"})
      Review.belongsTo(models.Spot,{foreignKey:"spotId"})
    }
  };
  Review.init({
    authorId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    spotId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    body: {
      type:DataTypes.TEXT,
      allowNull:true,
    },
    rating: {
      type:DataTypes.NUMERIC(3,2),
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
