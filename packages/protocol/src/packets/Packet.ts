import { PacketBuffer } from "..";

export interface Packet {
    read(buffer: PacketBuffer): void;
    write(buffer: PacketBuffer): void;
}