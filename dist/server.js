#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = require("http");
const port = Number(process.env.SERVER_PORT || 8000);
const server = new http_1.Server();
server.listen(port, () => console.info('Server initialized.'))
    .on('error', (err) => {
    if (err.syscall !== 'listen')
        throw err;
    const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
    switch (err.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges.`);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use.`);
            break;
        default:
            throw err;
    }
    process.exit(1);
})
    .on('listening', () => {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr === null || addr === void 0 ? void 0 : addr.port}`;
    console.info(`Listening on ${bind}.`);
});
