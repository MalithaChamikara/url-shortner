const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    unique: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Url;