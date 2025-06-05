import { Server } from "./server";
import { PacketBuffer } from "@saekkutu/protocol";

const buffer = new PacketBuffer(new Uint8Array());
buffer.writeString("Hello, world!");
buffer.writeUint8(123);
buffer.writeUint32(1234567890);
buffer.writeInt32(-1234567890);
buffer.offset = 0
console.log(buffer.readString());
console.log(buffer.readUint8());
console.log(buffer.readUint32());
console.log(buffer.readInt32());
console.log(buffer)
console.log(buffer.buffer.length)

const server = new Server();

server.serve();