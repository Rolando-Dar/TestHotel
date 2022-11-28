"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_model_1 = __importDefault(require("../models/room.model"));
class RoomController {
    constructor() {
        this.createRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { roomNumber, typeRoom, capacity, beds, price, description, availability } = req.body;
            try {
                let newRoom = yield room_model_1.default.create({
                    roomNumber: roomNumber,
                    typeRoom: typeRoom,
                    capacity: capacity,
                    beds: beds,
                    price: price,
                    description: description,
                    availability: availability
                });
                if (newRoom) {
                    return res.json({
                        message: 'Successfully registered room',
                        dataRoom: newRoom
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    message: 'Registration error',
                    dataRoom: {}
                });
            }
        });
        this.getRooms = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield room_model_1.default.findAll({
                    attributes: ['idroom', 'roomNumber', 'typeRoom', 'capacity', 'beds', 'price', 'description', 'availability'],
                    order: [
                        ['idroom', 'ASC']
                    ]
                });
                res.json({
                    dataRooms: rooms
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const room = yield room_model_1.default.findOne({
                where: {
                    idroom: id
                }
            });
            res.json({
                dataRoom: room
            });
        });
        this.deleteRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteRowCount = yield room_model_1.default.destroy({
                where: {
                    idroom: id
                }
            });
            res.json({
                message: 'Room successfully removed',
                count: deleteRowCount
            });
        });
        this.updateRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { roomNumber, typeRoom, capacity, beds, price, description, availability } = req.body;
            const rooms = yield room_model_1.default.findAll({
                attributes: ['idroom', 'roomNumber', 'typeRoom', 'capacity', 'beds', 'price', 'description', 'availability'],
                where: {
                    idroom: id
                }
            });
            if (rooms.length > 0) {
                rooms.forEach((rooms) => __awaiter(this, void 0, void 0, function* () {
                    yield rooms.update({
                        roomNumber: roomNumber,
                        typeRoom: typeRoom,
                        capacity: capacity,
                        beds: beds,
                        price: price,
                        description: description,
                        availability: availability
                    });
                }));
            }
            return res.json({
                message: 'Room updated successfully',
                dataRoom: rooms
            });
        });
    }
}
exports.default = RoomController;
