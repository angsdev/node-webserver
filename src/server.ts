#!/usr/bin/env node
/*-----------------------------------------------------*/
import dotenv from 'dotenv'; dotenv.config();
import { Server } from 'http';
const port: number = Number(process.env.SERVER_PORT || 8000);
/*-----------------------------------------------------*/

const server = new Server();
server.listen(port, () => console.info('Server initialized.'))
      .on('error', (err: any) => {

        if(err.syscall !== 'listen') throw err;
        const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
        /********* handle specific listen errors with friendly messages *********/
        switch(err.code){
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
        const bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr?.port}`;
        console.info(`Listening on ${bind}.`);
      });