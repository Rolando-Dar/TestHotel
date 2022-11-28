import bodyParser from 'body-parser';
import express from 'express';
import Routes from '../routes/index.routes';
import database from './sequelize';

class Server {

    private app: any;

    constructor(private port?: number | string) {

        this.app = express();
        this.settings();
        this.dbConection();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    async dbConection() {
        try {
            await database.authenticate().catch((error: any) => console.log(error));
            console.log('Database online');
            this.syncModels();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async syncModels() {
        try {
            await database.sync({ force: false }).then((e: any) => {
                console.log('Models synchronized');
            }).catch((e: any) => {
                console.log(e, 'error')
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true}));
        this.app.use(bodyParser.json());
    }

    routes() {
        const routes = new Routes(this.app);
        routes.init();
    }

    async listen() {
        const port = this.app.get('port');
        await this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    }


}

export default Server;