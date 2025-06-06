import { Packet, PacketBuffer } from "..";

export class PacketPing implements Packet {
    read(_buffer: PacketBuffer): void {}
    write(_buffer: PacketBuffer): void {}
}