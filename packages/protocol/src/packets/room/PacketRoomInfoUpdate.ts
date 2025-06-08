import { Packet, PacketBuffer } from "../..";

export class PacketRoomInfoUpdate implements Packet {
    public id?: string;
    public title?: string;

    public read(buffer: PacketBuffer): void {
        this.id = buffer.readString();
        this.title = buffer.readString();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.id) throw new Error("Id is not set");
        if (!this.title) throw new Error("Title is not set");

        buffer.writeString(this.id);
        buffer.writeString(this.title);
    }
}