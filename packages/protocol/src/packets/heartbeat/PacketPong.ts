import { Packet, PacketBuffer } from "../..";

export class PacketPong implements Packet {
    read(_buffer: PacketBuffer): void {}
    write(_buffer: PacketBuffer): void {}
}