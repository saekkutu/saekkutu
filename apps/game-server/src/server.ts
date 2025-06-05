import { ServerWebSocket } from "bun";

export interface ServerConfig {
    port: number;
}

export class Server {
    public config: ServerConfig;
    public wsServer?: Bun.Server;

    constructor(config: ServerConfig = { port: 3000 }) {
        this.config = config;
    }

    public serve() {
        this.wsServer = Bun.serve({
            port: this.config.port,
            fetch(_req, _server) {},
            websocket: {
                message: this.onMessage,
                open(_ws) {},
                close(_ws, _code, _message) {},
                drain(_ws) {},
            }
        })
    }

    private onMessage(ws: ServerWebSocket, message: string) {
    }
}