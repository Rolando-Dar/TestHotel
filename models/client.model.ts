import database from "../classes/sequelize";
import Sequelize from 'sequelize';
import Booking from "./booking.model";

const Client = database.define('clients', {
    idcli: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    fistName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secondName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    motherLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identityCard: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cellularNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
});

Client.hasMany(Booking, { foreignKey: 'cliId', sourceKey: 'idcli' } );
Booking.belongsTo(Client, { foreignKey: 'cliId' });

export default Client;