const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Url = require('./urlModel');

const Analytics = sequelize.define('analytics', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  urlId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'urls',
      key: 'id',
    },
  },
  clickCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});


module.exports = Analytics;