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
const booking_model_1 = __importDefault(require("../models/booking.model"));
class BookingController {
    constructor() {
        this.createBooking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { entryDate, departureDate, daysStay, amountPay, totalAmount, paymentMethod, reservationStatus, cliId, roomId } = req.body;
            try {
                let newBooking = yield booking_model_1.default.create({
                    entryDate: entryDate,
                    departureDate: departureDate,
                    daysStay: daysStay,
                    amountPay: amountPay,
                    totalAmount: totalAmount,
                    paymentMethod: paymentMethod,
                    reservationStatus: reservationStatus,
                    cliId: cliId,
                    roomId: roomId
                });
                if (newBooking) {
                    return res.json({
                        message: 'Successfully registered booking',
                        dataBooking: newBooking
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    message: 'Registration error',
                    dataBooking: {}
                });
            }
        });
        this.getBookings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield booking_model_1.default.findAll({
                    attributes: ['idbooking', 'entryDate', 'departureDate', 'daysStay', 'amountPay', 'totalAmount', 'paymentMethod', 'reservationStatus', 'cliId', 'roomId', 'updatedAt'],
                    order: [
                        ['updatedAt', 'ASC']
                    ]
                });
                res.json({
                    dataBookings: bookings
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneBooking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const booking = yield booking_model_1.default.findOne({
                where: {
                    idbooking: id
                }
            });
            res.json({
                dataBooking: booking
            });
        });
        this.deleteBooking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteRowCount = yield booking_model_1.default.destroy({
                where: {
                    idbooking: id
                }
            });
            res.json({
                message: 'Booking successfully removed',
                count: deleteRowCount
            });
        });
        this.updateBooking = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { entryDate, departureDate, daysStay, amountPay, totalAmount, paymentMethod, reservationStatus, cliId, roomId } = req.body;
            const bookings = yield booking_model_1.default.findAll({
                attributes: ['idbooking', 'entryDate', 'departureDate', 'daysStay', 'amountPay', 'totalAmount', 'paymentMethod', 'reservationStatus', 'cliId', 'roomId', 'updatedAt'],
                where: {
                    idbooking: id
                }
            });
            if (bookings.length > 0) {
                bookings.forEach((bookings) => __awaiter(this, void 0, void 0, function* () {
                    yield bookings.update({
                        entryDate: entryDate,
                        departureDate: departureDate,
                        daysStay: daysStay,
                        amountPay: amountPay,
                        totalAmount: totalAmount,
                        paymentMethod: paymentMethod,
                        reservationStatus: reservationStatus,
                        cliId: cliId,
                        roomId: roomId
                    });
                }));
            }
            return res.json({
                message: 'Booking updated successfully',
                dataBooking: bookings
            });
        });
        this.getBookingByClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { cliId } = req.params;
            const bookings = yield booking_model_1.default.findAll({
                attributes: ['idbooking', 'entryDate', 'departureDate', 'daysStay', 'amountPay', 'totalAmount', 'paymentMethod', 'reservationStatus', 'cliId', 'roomId', 'updatedAt'],
                where: { cliId },
                order: [
                    ['updatedAt', 'ASC']
                ]
            });
            res.json({
                dataBookings: bookings
            });
        });
        this.getBookingByRoom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { roomId } = req.params;
            const bookings = yield booking_model_1.default.findAll({
                attributes: ['idbooking', 'entryDate', 'departureDate', 'daysStay', 'amountPay', 'totalAmount', 'paymentMethod', 'reservationStatus', 'cliId', 'roomId', 'updatedAt'],
                where: { roomId },
                order: [
                    ['updatedAt', 'ASC']
                ]
            });
            res.json({
                dataBookings: bookings
            });
        });
    }
}
exports.default = BookingController;
