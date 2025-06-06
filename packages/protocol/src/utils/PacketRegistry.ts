import { Packet, PacketPing, PacketPong, PacketType } from "../packets";
import { PacketBuffer } from "./PacketBuffer";

export type PacketHandler<T> = (something: T, packet: Packet) => void;
export class PacketRegistry<T> {
    private handlers: Map<PacketType, PacketHandler<T>[]>;

    constructor() {
        this.handlers = new Map();
    }

    public register(type: PacketType, handler: PacketHandler<T>) {
        const handlers = this.handlers.get(type) || [];
        handlers.push(handler);
        this.handlers.set(type, handlers);
    }

    public handle(something: T, type: PacketType, packet: Packet) {
        const handlers = this.handlers.get(type);
        if (!handlers) {
            console.warn(`No handler registered for packet type: ${PacketType[type]}`);
            return;
        }
        
        handlers.forEach(handler => handler(something, packet));
    }

    public handleBuffer(something: T, buffer: Uint8Array) {
        const packetBuffer = new PacketBuffer(buffer);
        const type = packetBuffer.readUint8() as PacketType;

        const packet = this.createPacket(type);
        if (!packet) {
            console.warn(`Unknown packet type: ${PacketType[type]}`);
            return;
        }
        packet.read(packetBuffer);

        this.handle(something, type, packet);
    }

    private createPacket(type: PacketType): Packet | null {
        switch (type) {
            case PacketType.Ping:
                return new PacketPing();
            case PacketType.Pong:
                return new PacketPong();
            default:
                return null;
        }
    }
} 