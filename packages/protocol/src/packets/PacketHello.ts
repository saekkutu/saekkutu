import { PacketBuffer, Packet } from "..";

export class PacketHello implements Packet {
    public interval?: number;

    constructor() {}

    public read(buffer: PacketBuffer): void {
        this.interval = buffer.readInt32();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.interval) throw new Error("Interval is not set");
        buffer.writeInt32(this.interval);
    }
}