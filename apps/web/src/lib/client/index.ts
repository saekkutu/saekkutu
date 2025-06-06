import { PacketBuffer, PacketLogin, PacketPing, PacketRegistry, PacketType, type Packet, PacketUserInfoUpdate, PacketReady } from "@saekkutu/protocol";
import { addUser, clearUsers, removeUser } from "../stores/users";

export interface ClientConfig {
    url: string;
    heartbeatInterval: number;
}

export class Client {
    private config: ClientConfig;
    private ws?: WebSocket;
    private packetRegistry: PacketRegistry<Client> = new PacketRegistry();

    private heartbeatInterval?: NodeJS.Timeout;
    private lastPongTime: number = 0;
    
    constructor(config: ClientConfig) {
        this.config = config;
        this.registerHandlers();
    }

    public connect() {
        this.ws = new WebSocket(this.config.url);
        this.ws.binaryType = "arraybuffer";

        this.ws.addEventListener("open", async () => {
            this.startHeartbeat();
            this.login("test");
        });
        
        this.ws.addEventListener("message", (event) => {
            this.packetRegistry.handleBuffer(this, new Uint8Array(event.data));
        });
    }

    public disconnect() {
        clearUsers();
        this.ws?.close();
        this.heartbeatInterval && clearInterval(this.heartbeatInterval);
    }
    
    public registerHandlers() {
        this.packetRegistry.register(PacketType.Pong, (_client: Client, _packet: Packet) => {
            this.lastPongTime = Date.now();
        });

        this.packetRegistry.register(PacketType.Ready, (_client: Client, packet: Packet) => {
            const readyPacket = packet as PacketReady;
            if (!readyPacket.id || !readyPacket.username) return;
            
            addUser({ id: readyPacket.id, username: readyPacket.username });
        });

        this.packetRegistry.register(PacketType.UserInfoUpdate, (_client: Client, packet: Packet) => {
            const userInfoPacket = packet as PacketUserInfoUpdate;
            if (!userInfoPacket.id || !userInfoPacket.username) return;
            
            addUser({ id: userInfoPacket.id, username: userInfoPacket.username });
        });

        this.packetRegistry.register(PacketType.UserInfoRemove, (_client: Client, packet: Packet) => {
            const userInfoPacket = packet as PacketUserInfoUpdate;
            if (!userInfoPacket.id) return;
            
            removeUser(userInfoPacket.id);
        });
    }

    public send(type: PacketType, data: Packet) {
        const buffer = new PacketBuffer(new Uint8Array());
        buffer.writeUint8(type);
        data.write(buffer);
        this.ws?.send(buffer.buffer);
    }

    private startHeartbeat() {
        this.lastPongTime = Date.now();
        
        this.send(PacketType.Ping, new PacketPing());
        
        this.heartbeatInterval = setInterval(() => {
            const timeSinceLastPong = Date.now() - this.lastPongTime;
            if (timeSinceLastPong > this.config.heartbeatInterval * 2) {
                console.log(`Heartbeat timeout: ${timeSinceLastPong}ms`);
                this.disconnect();
                this.connect();
                return;
            }
            
            this.send(PacketType.Ping, new PacketPing());
        }, this.config.heartbeatInterval);
    }

    public login(username: string) {
        const packet = new PacketLogin();
        packet.username = username;
        this.send(PacketType.Login, packet);
    }
}