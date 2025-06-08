import { Packet, PacketBuffer } from "../..";

export class PacketRoomInfoUpdate implements Packet {
    public id?: number;
    public title?: string;
    public creator?: number;
    public users?: number[];

    public read(buffer: PacketBuffer): void {
        this.id = buffer.readUint16();
        this.title = buffer.readString();
        this.creator = buffer.readUint32();

        const userCount = buffer.readUint8();
        this.users = [];
        for (let i = 0; i < userCount; i++) {
            this.users.push(buffer.readUint32());
        }
    }

    public write(buffer: PacketBuffer): void {
        if (!this.id) throw new Error("Id is not set");
        if (!this.title) throw new Error("Title is not set");
        if (!this.creator) throw new Error("Creator is not set");
        if (!this.users) throw new Error("Users is not set");

        buffer.writeUint16(this.id);
        buffer.writeString(this.title);
        buffer.writeUint32(this.creator);
        
        buffer.writeUint8(this.users.length);
        for (const user of this.users) {
            buffer.writeUint32(user);
        }
    }
}