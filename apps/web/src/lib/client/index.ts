import { PacketBuffer, PacketLogin, PacketPing, PacketRegistry, PacketType, type Packet, PacketUserInfoUpdate, PacketReady, PacketChatBroadcast } from "@saekkutu/protocol";
import { addUser, clearUsers, removeUser, users } from "$lib/stores/users";
import { addChat } from "$lib/stores/chat";
import { get } from "svelte/store";
import * as Handlers from "./handlers";
import { clearRooms } from "$lib/stores/rooms";

export interface ClientConfig {
    url: string;
}

export class Client {
    public static instance: Client;

    private config: ClientConfig;
    private ws?: WebSocket;
    private packetRegistry: PacketRegistry<Client> = new PacketRegistry();

    public heartbeatInterval?: NodeJS.Timeout;
    public lastPongTime: number = 0;
    
    constructor(config: ClientConfig) {
        this.config = config;
        this.registerHandlers();

        Client.instance = this;
    }

    public connect() {
        this.ws = new WebSocket(this.config.url);
        this.ws.binaryType = "arraybuffer";

        this.ws.addEventListener("message", (event) => {
            this.packetRegistry.handleBuffer(this, new Uint8Array(event.data));
        });
    }

    public disconnect() {
        clearUsers();
        clearRooms();

        this.ws?.close();
        this.heartbeatInterval && clearInterval(this.heartbeatInterval);
    }
    
    public registerHandlers() {
        this.packetRegistry.register(PacketType.Hello, Handlers.HelloHandler.handle);
        this.packetRegistry.register(PacketType.Pong, Handlers.PongHandler.handle);
        this.packetRegistry.register(PacketType.Ready, Handlers.ReadyHandler.handle);

        this.packetRegistry.register(PacketType.UserInfoUpdate, Handlers.UserInfoUpdateHandler.handle);
        this.packetRegistry.register(PacketType.UserInfoRemove, Handlers.UserInfoRemoveHandler.handle);

        this.packetRegistry.register(PacketType.ChatBroadcast, Handlers.ChatBroadcastHandler.handle);

        this.packetRegistry.register(PacketType.RoomInfoUpdate, Handlers.RoomInfoUpdateHandler.handle);
    }

    public send(type: PacketType, data: Packet) {
        const buffer = new PacketBuffer(new Uint8Array());
        buffer.writeUint8(type);
        data.write(buffer);
        this.ws?.send(buffer.buffer);
    }

    public startHeartbeat(interval: number) {
        this.lastPongTime = Date.now();
        
        this.send(PacketType.Ping, new PacketPing());
        
        this.heartbeatInterval = setInterval(() => {
            const timeSinceLastPong = Date.now() - this.lastPongTime;
            if (timeSinceLastPong > interval * 2) {
                console.log(`Heartbeat timeout: ${timeSinceLastPong}ms`);
                this.disconnect();
                this.connect();
                return;
            }
            
            this.send(PacketType.Ping, new PacketPing());
        }, interval);
    }

    public login(username: string) {
        const packet = new PacketLogin();
        packet.username = username;
        this.send(PacketType.Login, packet);
    }
}