const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: "mysql",
  }
);

// Import models
const User = require("./models/User.model");
const UserProfile = require("./models/UserProfile.model");
const Attendance = require("./models/Attendance.model");
const Payroll = require("./models/Payroll.model");

// Define associations
User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Attendance, { foreignKey: "userId" });
Attendance.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Payroll, { foreignKey: "userId" });
Payroll.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  UserProfile,
  Attendance,
  Payroll,
};
