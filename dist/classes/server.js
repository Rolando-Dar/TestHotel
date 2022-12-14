"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("../routes/index.routes"));
const sequelize_1 = __importDefault(require("./sequelize"));
class Server {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.dbConection();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    dbConection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_1.default.authenticate().catch((error) => console.log(error));
                console.log('Database online');
                this.syncModels();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    syncModels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize_1.default.sync({ force: false }).then((e) => {
                    console.log('Models synchronized');
                }).catch((e) => {
                    console.log(e, 'error');
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
    }
    routes() {
        const routes = new index_routes_1.default(this.app);
        routes.init();
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = this.app.get('port');
            yield this.app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        });
    }
}
exports.default = Server;
