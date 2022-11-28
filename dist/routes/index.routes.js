"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_1 = __importDefault(require("./hotel"));
class Routes {
    constructor(app) {
        this.router = (0, express_1.Router)();
        this.app = app;
    }
    init() {
        hotel_1.default.init(this.router);
        this.app.use('/api', this.router);
    }
}
exports.default = Routes;
