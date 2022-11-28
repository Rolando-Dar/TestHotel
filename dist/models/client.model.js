"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../classes/sequelize"));
const sequelize_2 = __importDefault(require("sequelize"));
const booking_model_1 = __importDefault(require("./booking.model"));
const Client = sequelize_1.default.define('clients', {
    idcli: {
        type: sequelize_2.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fistName: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    secondName: {
        type: sequelize_2.default.STRING
    },
    lastName: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    motherLastName: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    identityCard: {
        type: sequelize_2.default.INTEGER,
        allowNull: false
    },
    cellularNumber: {
        type: sequelize_2.default.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
Client.hasMany(booking_model_1.default, { foreignKey: 'cliId', sourceKey: 'idcli' });
booking_model_1.default.belongsTo(Client, { foreignKey: 'cliId' });
exports.default = Client;
