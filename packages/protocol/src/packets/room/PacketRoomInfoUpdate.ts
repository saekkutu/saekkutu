import { Packet, PacketBuffer } from "../..";

export class PacketRoomInfoUpdate implements Packet {
    public id?: number;
    public title?: string;

    public read(buffer: PacketBuffer): void {
        this.id = buffer.readUint16();
        this.title = buffer.readString();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.id) throw new Error("Id is not set");
        if (!this.title) throw new Error("Title is not set");

        buffer.writeUint16(this.id);
        buffer.writeString(this.title);
    }
}