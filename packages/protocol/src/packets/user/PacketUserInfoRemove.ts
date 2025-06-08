import { Packet, PacketBuffer } from "../..";

export class PacketUserInfoRemove implements Packet {
    public id?: number;

    public read(buffer: PacketBuffer): void {
        this.id = buffer.readUint32();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.id) throw new Error("Id is not set");
        buffer.writeUint32(this.id);
    }
}