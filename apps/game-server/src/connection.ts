import { Packet, PacketType } from "@saekkutu/protocol";
import { Server } from "./server";
import { SocketAddress } from "bun";

export class Connection {
    public server: Server;

    public id: string;
    public address: SocketAddress

    constructor(server: Server, id: string, address: SocketAddress) {
        this.server = server;
        this.id = id;
        this.address = address;
    }

    public send(type: PacketType, packet: Packet) {
        this.server.send(this.id, type, packet);
    }
}