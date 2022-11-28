import { Router, Express } from "express";
import HotelRoutes from "./hotel";

class Routes {
    public router: Router;
    private app: Express;

    constructor(app: Express) {
        this.router = Router();
        this.app = app;
    }

    public init(): void {
        HotelRoutes.init(this.router);
        this.app.use('/api', this.router);
    }
}

export default Routes;