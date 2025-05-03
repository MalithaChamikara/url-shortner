const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Analytics = require('./analytics');

const Url = sequelize.define('url', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  originalUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  alias: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});


// Define the association
Url.hasOne(Analytics, { foreignKey: 'urlId', as: 'analytics' });
Analytics.belongsTo(Url, { foreignKey: 'urlId', as: 'url' });

module.exports = Url;