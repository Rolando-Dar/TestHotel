import { Router } from "express";
import BookingController from "../controllers/bookings.controller";
import ClientController from "../controllers/clients.controller";
import RoomController from "../controllers/rooms.controller";

class HotelRoutes {
    static init(router: Router) {
        //Client API
        router.post('/client/create', this.clientController.createClient);
        router.get('/clients', this.clientController.getClients);
        router.get('/client/:id', this.clientController.getOneClient);
        router.delete('/client/:id', this.clientController.deleteClient);
        router.put('/client/:id', this.clientController.updateClient);
        //Room API
        router.post('/room/create', this.roomController.createRoom);
        router.get('/rooms', this.roomController.getRooms);
        router.get('/room/:id', this.roomController.getOneRoom);
        router.delete('/room/:id', this.roomController.deleteRoom);
        router.put('/room/:id', this.roomController.updateRoom);
        //Booking API
        router.post('/booking/create', this.bookingController.createBooking);
        router.get('/bookings', this.bookingController.getBookings);
        router.get('/booking/:id', this.bookingController.getOneBooking);
        router.delete('/booking/:id', this.bookingController.deleteBooking);
        router.put('/booking/:id', this.bookingController.updateBooking);
        router.get('/bookings/client/:cliId', this.bookingController.getBookingByClient);
        router.get('/bookings/room/:roomId', this.bookingController.getBookingByRoom);
    }
    static clientController = new ClientController();
    static roomController = new RoomController();
    static bookingController = new BookingController();
}

export default HotelRoutes;