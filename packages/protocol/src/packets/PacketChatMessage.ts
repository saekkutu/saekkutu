import { Packet, PacketBuffer } from "..";

export class PacketChatMessage implements Packet {
    public message?: string;

    public read(buffer: PacketBuffer): void {
        this.message = buffer.readString();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.message) throw new Error("Message is not set");
        buffer.writeString(this.message);
    }
}
