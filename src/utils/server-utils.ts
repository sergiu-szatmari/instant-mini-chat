import { Server } from 'http';
import cli from 'cli-color';
import debug from 'debug';


export const ServerActions =
  (server: Server, port?: number | string | false) => {
    return {
      onListening: () => {
        const addr = server.address();
        const bind = typeof addr === 'string' ?
          `pipe ${ addr }` :
          `port ${ addr!.port }`;
        debug(`Server listening on ${ cli.cyan(String(bind)) }`);
        console.log(`Server listening on port ${ cli.cyan(String(port)) }`)
      },
      onError: (error: any) => {
        if (error.syscall !== 'listen') throw error;

        const bind = typeof port === 'string' ?
          `Pipe ${ port }` :
          `Port ${ port }`;

        switch (error.code) {
          case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;

          case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;

          default:
            throw error;
        }
      }
    };
  }
