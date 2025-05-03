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
    references: {
      model: Url,
      key: 'id',
    },
  },
  clickCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Url.hasOne(Analytics, { foreignKey: 'urlId' });
Analytics.belongsTo(Url, { foreignKey: 'urlId' });

module.exports = Analytics;