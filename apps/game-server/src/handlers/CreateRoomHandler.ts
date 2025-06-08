import { PacketRoomCreate, PacketRoomInfoUpdate, PacketType } from "@saekkutu/protocol";
import { Connection } from "../connection";
import { Room } from "../room";

export class CreateRoomHandler {
    public static async handle(connection: Connection, packet: PacketRoomCreate) {
        if (!packet.title) return;
        if (!connection.user) return;

        let id = -1;
        for (let i = 1; i <= 999; i++) {
            if (!connection.server.rooms.has(i)) {
                id = i;
                break;
            }
        }
        if (id === -1) {
            console.error("Failed to create room: server is full.");
            return;
        }

        const room = new Room(id, packet.title);
        connection.server.rooms.set(room.id, room);

        const infoUpdatePacket = new PacketRoomInfoUpdate();
        infoUpdatePacket.id = room.id;
        infoUpdatePacket.title = room.title;
        infoUpdatePacket.owner = connection.user.id;

        for (const otherConnection of connection.server.connections.values()) {
            otherConnection.send(PacketType.RoomInfoUpdate, infoUpdatePacket);
        }
    }
}