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
      Review.belongsTo(models.Review,{foreignKey:"authorId"})
    }
  };
  Review.init({
    authorId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    body: {
      type:DataTypes.TEXT,
      allowNull:true,
    },
    rating: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
