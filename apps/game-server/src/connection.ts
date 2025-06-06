import { Packet, PacketBuffer, PacketType } from "@saekkutu/protocol";
import { Server } from "./server";
import { ServerWebSocket } from "bun";
import { User } from "./user";

export class Connection {
    public readonly id: string;
    public readonly server: Server;
    public readonly ws: ServerWebSocket<string>;

    public user?: User;

    private lastPingTime: number;

    constructor(server: Server, ws: ServerWebSocket<string>) {
        this.id = ws.data;
        this.server = server;
        this.ws = ws;
        this.lastPingTime = Date.now();
    }

    public send(type: PacketType, packet: Packet) {
        const buffer = new PacketBuffer(new Uint8Array());
        buffer.writeUint8(type);
        packet.write(buffer);
        this.ws.send(buffer.buffer);
    }

    public close() {
        this.ws.terminate();
    }

    public setUser(user: User) {
        this.user = user;
    }

    public updateLastPingTime() {
        this.lastPingTime = Date.now();
    }

    public getLastPingTime(): number {
        return this.lastPingTime;
    }
}