import { Request, Response } from "express";
import Booking from "../models/booking.model";

export default class BookingController {
    createBooking = async (req: Request, res: Response) => {
        const { entryDate, departureDate, daysStay, amountPay, totalAmount, paymentMethod, reservationStatus, cliId, roomId } = req.body;
        try {
            let newBooking = await Booking.create({
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
            if(newBooking) {
                return res.json({
                    message: 'Successfully registered booking',
                    dataBooking: newBooking
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Registration error',
                dataBooking: {}
            })
        }
    }

    getBookings = async (req: Request, res: Response) => {
        try {
            const bookings = await Booking.findAll({
                attributes: ['idbooking', 'entryDate', 'departureDate', 'daysStay', 'amountPay', 'totalAmount', 'paymentMethod', 'reservationStatus', 'cliId', 'roomId', 'updatedAt'],
                order: [
                    ['updatedAt', 'ASC']
                ]
            });
            res.json({
                dataBookings: bookings
            });
        } catch (e) {
            console.log(e);
        }
    }

    getOneBooking = async (req: Request, res: Response) => {
        const { id } = req.params;
        const booking = await Booking.findOne({
            where: {
                idbooking: id
            }
        })
        res.json({
            dataBooking: booking
        });
    }

    deleteBooking = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleteRowCount = await Booking.destroy({
            where: {
                idbooking: id
            }
        })
        res.json({
            message: 'Booking successfully removed',
            count: deleteRowCount
        });
    }

    updateBooking = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { entryDate, departureDate, daysStay, amountPay, totalAmount, paymentMethod, reservationStatus, cliId, roomId } = req.body;

        const bookings = await Booking.findAll({
            attributes: ['idbooking', 'entryDate', 'departureDate', 'daysStay', 'amountPay', 'totalAmount', 'paymentMethod', 'reservationStatus', 'cliId', 'roomId', 'updatedAt'],
            where: {
                idbooking: id
            }
        });

        if(bookings.length > 0) {
            bookings.forEach(async bookings => {
                await bookings.update({
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
            })
        }

        return res.json({
            message: 'Booking updated successfully',
            dataBooking: bookings
        })
    }

    getBookingByClient = async (req: Request, res: Response) => {
        const { cliId } = req.params;
        const bookings = await Booking.findAll({
            attributes: ['idbooking', 'entryDate', 'departureDate', 'daysStay', 'amountPay', 'totalAmount', 'paymentMethod', 'reservationStatus', 'cliId', 'roomId', 'updatedAt'],
            where: { cliId },
            order: [
                ['updatedAt', 'ASC']
            ]
        });
        res.json({
            dataBookings: bookings
        });
    }

    getBookingByRoom = async (req: Request, res: Response) => {
        const { roomId } = req.params;
        const bookings = await Booking.findAll({
            attributes: ['idbooking', 'entryDate', 'departureDate', 'daysStay', 'amountPay', 'totalAmount', 'paymentMethod', 'reservationStatus', 'cliId', 'roomId', 'updatedAt'],
            where: { roomId },
            order: [
                ['updatedAt', 'ASC']
            ]
        });
        res.json({
            dataBookings: bookings
        });
    }
}