import { PacketBuffer, PacketPing, PacketRegistry, PacketType, type Packet } from "@saekkutu/protocol";

export interface ClientConfig {
    url: string;
}

export class Client {
    private config: ClientConfig;
    private ws?: WebSocket;
    private packetRegistry: PacketRegistry<Client> = new PacketRegistry();

    constructor(config: ClientConfig) {
        this.config = config;
        this.registerHandlers();
    }

    public connect() {
        this.ws = new WebSocket(this.config.url);

        this.ws.addEventListener("open", async () => {
            this.send(PacketType.Ping, new PacketPing());
        });
        
        this.ws.addEventListener("message", (event) => {
            if (event.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.packetRegistry.handleBuffer(this, new Uint8Array(reader.result as ArrayBuffer));
                };
                reader.readAsArrayBuffer(event.data);
            } else {
                this.packetRegistry.handleBuffer(this, new Uint8Array(event.data));
            }
        });
    }
    
    public registerHandlers() {
        this.packetRegistry.register(PacketType.Pong, (_client: Client, _packet: Packet) => {
            console.log("Pong received");
        });
    }

    public send(type: PacketType, data: Packet) {
        const buffer = new PacketBuffer(new Uint8Array());
        buffer.writeUint8(type);
        data.write(buffer);
        this.ws?.send(buffer.buffer);
    }
}