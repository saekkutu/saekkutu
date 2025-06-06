import { ServerWebSocket } from "bun";
import { Packet, PacketBuffer, PacketPong, PacketRegistry, PacketType } from "@saekkutu/protocol";
import { randomUUID } from "crypto";
import { Connection } from "./connection";

export interface ServerConfig {
    port: number;
}

export class Server {
    public config: ServerConfig;
    public wsServer?: Bun.Server;
    private packetRegistry: PacketRegistry<string> = new PacketRegistry();
    private connections: Map<string, Connection> = new Map();

    constructor(config: ServerConfig = { port: 3000 }) {
        this.config = config;
        this.setupPacketHandlers();
    }

    private setupPacketHandlers() {
        this.packetRegistry.register(PacketType.Ping, (connectionId, _packet) => {
            console.log(`Ping received from ${connectionId}`);
            console.log(`IP: ${this.connections.get(connectionId)?.address?.address}`);
            this.send(connectionId, PacketType.Pong, new PacketPong());
        });
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
    }

    private onFetch(req: Request, server: Bun.Server) {
        const ip = server.requestIP(req);
        if (!ip) return Response.json({ error: "IP not found" }, { status: 400 });

        const connection = new Connection(this, randomUUID(), ip);
        this.connections.set(connection.id, connection);

        server.upgrade(req, {
            data: connection.id
        });
    }

    private onOpen(ws: ServerWebSocket<string>) {
        ws.subscribe(ws.data);
    }

    private onMessage(ws: ServerWebSocket<string>, message: string | Buffer) {
        if (typeof message === "string") {
            console.warn("Received string message, expected binary");
            return;
        }

        this.packetRegistry.handleBuffer(ws.data, new Uint8Array(message));
    }

    private onClose(_ws: ServerWebSocket<string>, _code: number, _message: string) {
    }

    public send(connectionId: string, type: PacketType, packet: Packet) {
        const buffer = new PacketBuffer(new Uint8Array());
        buffer.writeUint8(type);
        packet.write(buffer);
        this.wsServer?.publish(connectionId, buffer.buffer);
    }
}