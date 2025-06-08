import { Packet, PacketBuffer } from "../..";

export class PacketRoomInfoUpdate implements Packet {
    public id?: number;
    public title?: string;
    public owner?: number;

    public read(buffer: PacketBuffer): void {
        this.id = buffer.readUint16();
        this.title = buffer.readString();
        this.owner = buffer.readUint32();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.id) throw new Error("Id is not set");
        if (!this.title) throw new Error("Title is not set");
        if (!this.owner) throw new Error("Owner is not set");
        
        buffer.writeUint16(this.id);
        buffer.writeString(this.title);
        buffer.writeUint32(this.owner);
    }
}