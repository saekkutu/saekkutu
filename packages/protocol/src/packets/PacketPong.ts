import { Packet } from "./Packet";
import { PacketBuffer } from "../utils";

export class PacketPong implements Packet {
    read(_buffer: PacketBuffer): void {}
    write(_buffer: PacketBuffer): void {}
}