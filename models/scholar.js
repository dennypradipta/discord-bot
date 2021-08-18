const { DataTypes } = require("sequelize");
const db = require("../utils/db");

const Scholar = db.define("scholar", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discordID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  team: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scholarNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

module.exports = Scholar;
