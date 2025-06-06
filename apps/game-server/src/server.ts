import { ServerWebSocket } from "bun";
import { Packet, PacketBuffer, PacketPong, PacketRegistry, PacketType } from "@saekkutu/protocol";
import { randomUUID } from "crypto";

export interface ServerConfig {
    port: number;
}

export class Server {
    public config: ServerConfig;
    public wsServer?: Bun.Server;
    private packetRegistry: PacketRegistry<ServerWebSocket<string>> = new PacketRegistry();
    private connections: Map<string, undefined> = new Map();

    constructor(config: ServerConfig = { port: 3000 }) {
        this.config = config;
        this.setupPacketHandlers();
    }

    private setupPacketHandlers() {
        this.packetRegistry.register(PacketType.Ping, (ws, _packet) => {
            console.log(`Ping received from ${ws.data}`);
            this.send(ws, PacketType.Pong, new PacketPong());
        });
    }

    public serve() {
        this.wsServer = Bun.serve({
            port: this.config.port,
            fetch: this.onFetch.bind(this),
            websocket: {
                message: this.onMessage.bind(this),
                open(_ws) {},
                close: this.onClose.bind(this),
                drain(_ws) {},
            }
        });
    }

    private onFetch(req: Request, server: Bun.Server) {
        const connectionId = randomUUID();
        this.connections.set(connectionId, undefined);
        
        server.upgrade(req, {
            data: connectionId
        });
    }

    private onMessage(ws: ServerWebSocket<string>, message: string | Buffer) {
        if (typeof message === "string") {
            console.warn("Received string message, expected binary");
            return;
        }

        this.packetRegistry.handleBuffer(ws, new Uint8Array(message));
    }

    private onClose(ws: ServerWebSocket<string>, _code: number, _message: string) {
        this.connections.delete(ws.data);
    }

    public send(ws: ServerWebSocket<string>, type: PacketType, packet: Packet) {
        const buffer = new PacketBuffer(new Uint8Array());
        buffer.writeUint8(type);
        packet.write(buffer);
        ws.send(buffer.buffer);
    }
}