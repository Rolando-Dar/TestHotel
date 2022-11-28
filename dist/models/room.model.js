"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../classes/sequelize"));
const sequelize_2 = __importDefault(require("sequelize"));
const booking_model_1 = __importDefault(require("./booking.model"));
const Room = sequelize_1.default.define('rooms', {
    idroom: {
        type: sequelize_2.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    roomNumber: {
        type: sequelize_2.default.INTEGER
    },
    typeRoom: {
        type: sequelize_2.default.STRING
    },
    capacity: {
        type: sequelize_2.default.INTEGER
    },
    beds: {
        type: sequelize_2.default.INTEGER
    },
    price: {
        type: sequelize_2.default.INTEGER
    },
    description: {
        type: sequelize_2.default.STRING
    },
    availability: {
        type: sequelize_2.default.BOOLEAN
    }
}, {
    timestamps: false
});
Room.hasMany(booking_model_1.default, { foreignKey: 'roomId', sourceKey: 'idroom' });
booking_model_1.default.belongsTo(booking_model_1.default, { foreignKey: 'roomId' });
exports.default = Room;
