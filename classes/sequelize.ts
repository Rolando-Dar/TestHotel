import { Sequelize } from "sequelize";

const database = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'test-hotel',
    username: 'postgres',
    password: 'rolo123',
    port: 5432
});

export default database;