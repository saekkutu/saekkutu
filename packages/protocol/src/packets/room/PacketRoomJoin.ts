import { Packet, PacketBuffer } from "../..";

export class PacketRoomJoin implements Packet {
    public id?: number;

    public read(buffer: PacketBuffer): void {
        this.id = buffer.readUint16();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.id) throw new Error("Id is not set");
        buffer.writeUint16(this.id);
    }
}