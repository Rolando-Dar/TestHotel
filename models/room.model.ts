import database from '../classes/sequelize';
import Sequelize from 'sequelize';
import Booking from './booking.model';

const Room = database.define('rooms', {
    idroom: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    roomNumber: {
        type: Sequelize.INTEGER
    },
    typeRoom: {
        type: Sequelize.STRING
    },
    capacity: {
        type: Sequelize.INTEGER
    },
    beds: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    availability: {
        type: Sequelize.BOOLEAN
    }
},{
    timestamps: false
});

Room.hasMany(Booking, { foreignKey: 'roomId', sourceKey: 'idroom' } );
Booking.belongsTo(Booking, { foreignKey: 'roomId' } );

export default Room;