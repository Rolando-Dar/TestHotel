"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'test-hotel',
    username: 'postgres',
    password: 'rolo123',
    port: 5432
});
exports.default = database;
