import { PacketRoomCreate, PacketRoomInfoUpdate, PacketType } from "@saekkutu/protocol";
import { Connection } from "../connection";
import { Room } from "../room";
import { randomUUIDv7 } from "bun";

export class CreateRoomHandler {
    public static handle(connection: Connection, packet: PacketRoomCreate) {
        if (!packet.title) return;

        const room = new Room(randomUUIDv7(), packet.title);
        connection.server.rooms.set(room.id, room);

        const infoUpdatePacket = new PacketRoomInfoUpdate();
        infoUpdatePacket.id = room.id;
        infoUpdatePacket.title = room.title;

        connection.send(PacketType.RoomInfoUpdate, infoUpdatePacket);
    }
}