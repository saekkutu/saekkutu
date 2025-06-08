import { Packet, PacketBuffer } from "../..";

export class PacketChatBroadcast implements Packet {
    public id?: number;
    public message?: string;

    public read(buffer: PacketBuffer): void {
        this.id = buffer.readUint32();
        this.message = buffer.readString();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.id) throw new Error("Id is not set");
        if (!this.message) throw new Error("Message is not set");

        buffer.writeUint32(this.id);
        buffer.writeString(this.message);
    }
}