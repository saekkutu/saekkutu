import { Packet, PacketBuffer } from "../..";

export class PacketRoomLeave implements Packet {
    public read(_buffer: PacketBuffer): void {}
    public write(_buffer: PacketBuffer): void {}
}