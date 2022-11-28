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
const client_model_1 = __importDefault(require("../models/client.model"));
class ClientController {
    constructor() {
        this.createClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { fistName, secondName, lastName, motherLastName, identityCard, cellularNumber } = req.body;
            try {
                let newClient = yield client_model_1.default.create({
                    fistName: fistName,
                    secondName: secondName,
                    lastName: lastName,
                    motherLastName: motherLastName,
                    identityCard: identityCard,
                    cellularNumber: cellularNumber
                });
                if (newClient) {
                    return res.json({
                        message: 'Successfully registered client',
                        dataClient: newClient
                    });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    message: 'Registration error',
                    dataClient: {}
                });
            }
        });
        this.getClients = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield client_model_1.default.findAll({
                    attributes: ['idcli', 'fistName', 'secondName', 'lastName', 'motherLastName', 'identityCard', 'cellularNumber'],
                    order: [
                        ['idcli', 'ASC']
                    ]
                });
                res.json({
                    dataClients: clients
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getOneClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const client = yield client_model_1.default.findOne({
                where: {
                    idcli: id
                }
            });
            res.json({
                dataClient: client
            });
        });
        this.deleteClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteRowCount = yield client_model_1.default.destroy({
                where: {
                    idcli: id
                }
            });
            res.json({
                message: 'Client successfully removed',
                count: deleteRowCount
            });
        });
        this.updateClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { fistName, secondName, lastName, motherLastName, identityCard, cellularNumber } = req.body;
            const clients = yield client_model_1.default.findAll({
                attributes: ['idcli', 'fistName', 'secondName', 'lastName', 'motherLastName', 'identityCard', 'cellularNumber'],
                where: {
                    idcli: id
                }
            });
            if (clients.length > 0) {
                clients.forEach((clients) => __awaiter(this, void 0, void 0, function* () {
                    yield clients.update({
                        fistName: fistName,
                        secondName: secondName,
                        lastName: lastName,
                        motherLastName: motherLastName,
                        identityCard: identityCard,
                        cellularNumber: cellularNumber
                    });
                }));
            }
            return res.json({
                message: 'Client updated successfully',
                dataClient: clients
            });
        });
    }
}
exports.default = ClientController;
