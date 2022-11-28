import database from '../classes/sequelize';
import Sequelize from 'sequelize';

const Booking = database.define('bookings', {
    idbooking: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    entryDate: {
        type: Sequelize.DATE
    },
    departureDate: {
        type: Sequelize.DATE
    },
    daysStay: {
        type: Sequelize.INTEGER
    },
    amountPay: {
        type: Sequelize.INTEGER
    },
    totalAmount: {
        type: Sequelize.INTEGER
    },
    paymentMethod: {
        type: Sequelize.STRING
    },
    reservationStatus: {
        type: Sequelize.STRING
    },
    cliId: {
        type: Sequelize.INTEGER
    },
    roomId: {
        type: Sequelize.INTEGER
    }    
});

export default Booking;
