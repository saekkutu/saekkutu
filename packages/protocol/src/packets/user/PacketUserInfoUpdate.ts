import { Packet, PacketBuffer } from "../..";

export class PacketUserInfoUpdate implements Packet {
    public id?: number;
    public username?: string;

    public read(buffer: PacketBuffer): void {
        this.id = buffer.readUint32();
        this.username = buffer.readString();
    }

    public write(buffer: PacketBuffer): void {
        if (!this.id) throw new Error("Id is not set");
        if (!this.username) throw new Error("Username is not set");
        
        buffer.writeUint32(this.id);
        buffer.writeString(this.username);
    }
}