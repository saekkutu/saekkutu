import { Connection } from "../connection";
import { PacketRoomInfoUpdate, PacketRoomJoin, PacketType } from "@saekkutu/protocol";

export class RoomJoinHandler {
    public static handle(connection: Connection, packet: PacketRoomJoin) {
        if (!packet.id) return;
        if (!connection.user) return;

        const room = connection.server.rooms.get(packet.id);
        if (!room) return;
        if (room.users.includes(connection.user.id)) return;

        connection.user.roomId = room.id;
        room.users.push(connection.user.id);
        
        const infoUpdatePacket = new PacketRoomInfoUpdate();
        infoUpdatePacket.id = room.id;
        infoUpdatePacket.title = room.title;
        infoUpdatePacket.creator = room.creator;
        infoUpdatePacket.users = room.users;

        for (const otherConnection of connection.server.connections.values()) {
            if (!otherConnection.user) continue;

            otherConnection.send(PacketType.RoomInfoUpdate, infoUpdatePacket);
        }
    }
}