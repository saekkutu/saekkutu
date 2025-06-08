import { Packet, PacketBuffer } from "../..";

// TODO: Currently no auth system, so we just send the username
export class PacketLogin implements Packet {
    public username?: string;

    public read(buffer: PacketBuffer) {
        this.username = buffer.readString();
    }

    public write(buffer: PacketBuffer) {
        if (!this.username) throw new Error("Username is not set");
        buffer.writeString(this.username);
    }
}