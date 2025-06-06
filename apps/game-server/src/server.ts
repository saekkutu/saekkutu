import { ServerWebSocket } from "bun";
import { PacketRegistry, PacketType } from "@saekkutu/protocol";
import { randomUUID } from "crypto";
import { Connection } from "./connection";
import { PingHandler } from "./handlers";

export interface ServerConfig {
    port: number;
    heartbeatInterval: number;
}

export class Server {
    public readonly config: ServerConfig;
    
    private readonly packetRegistry: PacketRegistry<Connection> = new PacketRegistry();
    private readonly connections: Map<string, Connection> = new Map();

    public wsServer?: Bun.Server;

    constructor(config: ServerConfig = { port: 3000, heartbeatInterval: 2000 }) {
        this.config = {
            ...config,
        };
        this.setupPacketHandlers();
    }

    private setupPacketHandlers() {
        this.packetRegistry.register(PacketType.Ping, PingHandler.handle);
    }

    public serve() {
        this.wsServer = Bun.serve({
            port: this.config.port,
            fetch: this.onFetch.bind(this),
            websocket: {
                message: this.onMessage.bind(this),
                open: this.onOpen.bind(this),
                close: this.onClose.bind(this),
                drain(_ws) {},
            }
        });

        this.startHeartbeatCheck();
    }

    private startHeartbeatCheck() {
        setInterval(() => {
            const now = Date.now();
            for (const [connectionId, connection] of this.connections) {
                const lastPing = connection.getLastPingTime();
                if (now - lastPing <= this.config.heartbeatInterval * 5) continue;
                
                console.warn(`Connection ${connectionId} timed out (no ping for ${(now - lastPing) / 1000}s)`);
                connection.close();
            }
        }, this.config.heartbeatInterval);
    }

    private onFetch(req: Request, server: Bun.Server) {
        server.upgrade(req, {
            data: randomUUID()
        });
    }

    private onOpen(ws: ServerWebSocket<string>) {
        const connection = new Connection(this, ws);
        this.connections.set(ws.data, connection);
    }

    private onMessage(ws: ServerWebSocket<string>, message: string | Buffer) {
        if (typeof message === "string") {
            console.warn("Received string message, expected binary");
            return;
        }

        const connection = this.connections.get(ws.data);
        if (!connection) {
            console.warn("Received message from unknown connection");
            ws.close(1000, "Unknown connection");
            return;
        }

        this.packetRegistry.handleBuffer(connection, new Uint8Array(message));
    }

    private onClose(ws: ServerWebSocket<string>, _code: number, _message: string) {
        this.connections.delete(ws.data);
    }
}