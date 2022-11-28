"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../classes/sequelize"));
const sequelize_2 = __importDefault(require("sequelize"));
const Booking = sequelize_1.default.define('bookings', {
    idbooking: {
        type: sequelize_2.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    entryDate: {
        type: sequelize_2.default.DATE
    },
    departureDate: {
        type: sequelize_2.default.DATE
    },
    daysStay: {
        type: sequelize_2.default.INTEGER
    },
    amountPay: {
        type: sequelize_2.default.INTEGER
    },
    totalAmount: {
        type: sequelize_2.default.INTEGER
    },
    paymentMethod: {
        type: sequelize_2.default.STRING
    },
    reservationStatus: {
        type: sequelize_2.default.STRING
    },
    cliId: {
        type: sequelize_2.default.INTEGER
    },
    roomId: {
        type: sequelize_2.default.INTEGER
    }
});
exports.default = Booking;
