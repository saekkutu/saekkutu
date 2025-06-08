import { randomUUIDv7, ServerWebSocket } from "bun";
import { PacketRegistry, PacketType, PacketUserInfoRemove, PacketHello } from "@saekkutu/protocol";
import { Connection } from "./connection";
import { ChatMessageHandler, CreateRoomHandler, LoginHandler, PingHandler, RoomJoinHandler, RoomLeaveHandler } from "./handlers";
import { Room } from "./room";

export interface ServerConfig {
    port: number;
    heartbeatInterval: number;
}

export class Server {
    public readonly config: ServerConfig;

    public wsServer?: Bun.Server;
    
    public readonly connections: Map<string, Connection> = new Map();
    public readonly rooms: Map<number, Room> = new Map();

    private readonly packetRegistry: PacketRegistry<Connection> = new PacketRegistry();


    constructor(config: ServerConfig = { port: 3000, heartbeatInterval: 20000 }) {
        this.config = {
            ...config,
        };
        this.setupPacketHandlers();
    }

    private setupPacketHandlers() {
        this.packetRegistry.register(PacketType.Ping, PingHandler.handle);
        this.packetRegistry.register(PacketType.Login, LoginHandler.handle);
        this.packetRegistry.register(PacketType.ChatMessage, ChatMessageHandler.handle);
        this.packetRegistry.register(PacketType.RoomCreate, CreateRoomHandler.handle);
        this.packetRegistry.register(PacketType.RoomJoin, RoomJoinHandler.handle);
        this.packetRegistry.register(PacketType.RoomLeave, RoomLeaveHandler.handle);
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
            data: randomUUIDv7()
        });
    }

    private onOpen(ws: ServerWebSocket<string>) {
        const connection = new Connection(this, ws);
        this.connections.set(ws.data, connection);

        const helloPacket = new PacketHello();
        helloPacket.interval = this.config.heartbeatInterval;
        connection.send(PacketType.Hello, helloPacket);
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
        const connection = this.connections.get(ws.data);
        if (!connection) {
            console.warn("Received close event from unknown connection");
            return;
        }

        if (connection.user) {
            const removePacket = new PacketUserInfoRemove();
            removePacket.id = connection.user.id;

            for (const otherConnection of this.connections.values()) {
                if (otherConnection.user?.id === connection.user.id) continue;
                if (!otherConnection.user) continue;

                otherConnection.send(PacketType.UserInfoRemove, removePacket);
            }
        }

        this.connections.delete(ws.data);
    }
}