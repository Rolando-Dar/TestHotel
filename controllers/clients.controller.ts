import { Request, Response } from "express";
import Client from "../models/client.model";

export default class ClientController {
    createClient = async (req: Request, res: Response) => {
        const { fistName, secondName, lastName, motherLastName, identityCard, cellularNumber} = req.body;
        try {
            let newClient = await Client.create({
                fistName: fistName, 
                secondName: secondName, 
                lastName: lastName, 
                motherLastName: motherLastName, 
                identityCard: identityCard, 
                cellularNumber: cellularNumber
            });
            if(newClient) {
                return res.json({
                    message: 'Successfully registered client',
                    dataClient: newClient
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Registration error',
                dataClient: {}
            })
        }
    }

    getClients = async (req: Request, res: Response) => {
        try {
            const clients = await Client.findAll({
                attributes: ['idcli', 'fistName', 'secondName', 'lastName', 'motherLastName', 'identityCard', 'cellularNumber'],
                order: [
                    ['idcli', 'ASC']
                ]
            });
            res.json({
                dataClients: clients
            });
        } catch (e) {
            console.log(e);
        }
    }

    getOneClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const client = await Client.findOne({
            where: {
                idcli: id
            }
        })
        res.json({
            dataClient: client
        });
    }

    deleteClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleteRowCount = await Client.destroy({
            where: {
                idcli: id
            }
        })
        res.json({
            message: 'Client successfully removed',
            count: deleteRowCount
        });
    }

    updateClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { fistName, secondName, lastName, motherLastName, identityCard, cellularNumber} = req.body;

        const clients = await Client.findAll({
            attributes: ['idcli', 'fistName', 'secondName', 'lastName', 'motherLastName', 'identityCard', 'cellularNumber'],
            where: {
                idcli: id
            }
        });

        if(clients.length > 0) {
            clients.forEach(async clients => {
                await clients.update({
                    fistName: fistName, 
                    secondName: secondName, 
                    lastName: lastName, 
                    motherLastName: motherLastName, 
                    identityCard: identityCard, 
                    cellularNumber: cellularNumber
                });
            })
        }

        return res.json({
            message: 'Client updated successfully',
            dataClient: clients
        })
    }
}