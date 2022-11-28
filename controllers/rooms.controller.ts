import { Request, Response } from "express";
import Room from "../models/room.model";

export default class RoomController {
    createRoom = async (req: Request, res: Response) => {
        const { roomNumber, typeRoom, capacity, beds, price, description, availability } = req.body;
        try {
            let newRoom = await Room.create({
                roomNumber: roomNumber, 
                typeRoom: typeRoom, 
                capacity: capacity, 
                beds: beds, 
                price: price, 
                description: description, 
                availability: availability
            });
            if(newRoom) {
                return res.json({
                    message: 'Successfully registered room',
                    dataRoom: newRoom
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Registration error',
                dataRoom: {}
            })
        }
    }

    getRooms = async (req: Request, res: Response) => {
        try {
            const rooms = await Room.findAll({
                attributes: ['idroom', 'roomNumber', 'typeRoom', 'capacity', 'beds', 'price', 'description', 'availability'],
                order: [
                    ['idroom', 'ASC']
                ]
            });
            res.json({
                dataRooms: rooms
            });
        } catch (e) {
            console.log(e);
        }
    }

    getOneRoom = async (req: Request, res: Response) => {
        const { id } = req.params;
        const room = await Room.findOne({
            where: {
                idroom: id
            }
        })
        res.json({
            dataRoom: room
        });
    }

    deleteRoom = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleteRowCount = await Room.destroy({
            where: {
                idroom: id
            }
        })
        res.json({
            message: 'Room successfully removed',
            count: deleteRowCount
        });
    }

    updateRoom = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { roomNumber, typeRoom, capacity, beds, price, description, availability } = req.body;

        const rooms = await Room.findAll({
            attributes: ['idroom', 'roomNumber', 'typeRoom', 'capacity', 'beds', 'price', 'description', 'availability'],
            where: {
                idroom: id
            }
        });

        if(rooms.length > 0) {
            rooms.forEach(async rooms => {
                await rooms.update({
                    roomNumber: roomNumber, 
                    typeRoom: typeRoom, 
                    capacity: capacity, 
                    beds: beds, 
                    price: price, 
                    description: description, 
                    availability: availability
                });
            })
        }

        return res.json({
            message: 'Room updated successfully',
            dataRoom: rooms
        })
    }
}