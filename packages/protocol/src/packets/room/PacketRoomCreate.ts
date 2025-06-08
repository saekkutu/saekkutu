import { Packet, PacketBuffer } from "../..";

export class PacketRoomCreate implements Packet {
    public title?: string;

    public read(buffer: PacketBuffer): void {
        this.title = buffer.readString();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.title) throw new Error("Title is not set");
        buffer.writeString(this.title);
    }
}