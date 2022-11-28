"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookings_controller_1 = __importDefault(require("../controllers/bookings.controller"));
const clients_controller_1 = __importDefault(require("../controllers/clients.controller"));
const rooms_controller_1 = __importDefault(require("../controllers/rooms.controller"));
class HotelRoutes {
    static init(router) {
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
}
HotelRoutes.clientController = new clients_controller_1.default();
HotelRoutes.roomController = new rooms_controller_1.default();
HotelRoutes.bookingController = new bookings_controller_1.default();
exports.default = HotelRoutes;
