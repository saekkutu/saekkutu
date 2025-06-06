import { PacketBuffer } from "../utils";

export interface Packet {
    read(buffer: PacketBuffer): void;
    write(buffer: PacketBuffer): void;
}