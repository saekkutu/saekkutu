import { PacketBuffer, PacketPing, PacketRegistry, PacketType, type Packet } from "@saekkutu/protocol";

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
        });
        
        this.ws.addEventListener("message", (event) => {
            this.packetRegistry.handleBuffer(this, new Uint8Array(event.data));
        });
    }

    public disconnect() {
        this.ws?.close();
        this.heartbeatInterval && clearInterval(this.heartbeatInterval);
    }
    
    public registerHandlers() {
        this.packetRegistry.register(PacketType.Pong, (_client: Client, _packet: Packet) => {
            this.lastPongTime = Date.now();
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
            if (Date.now() - this.lastPongTime > this.config.heartbeatInterval * 2) {
                console.log("Heartbeat timeout");
                this.disconnect();
                this.connect();
                return;
            }
            
            this.send(PacketType.Ping, new PacketPing());
        }, this.config.heartbeatInterval);
    }
}