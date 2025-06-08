import { Connection } from "../connection";
import { PacketRoomInfoUpdate, PacketRoomInfoRemove, PacketRoomLeave, PacketType } from "@saekkutu/protocol";

export class RoomLeaveHandler {
    public static handle(connection: Connection, _packet: PacketRoomLeave) {
        if (!connection.user) return;
        if (!connection.user.roomId) return;

        const room = connection.server.rooms.get(connection.user.roomId);
        if (!room) return;
        if (!room.users.includes(connection.user.id)) return;

        connection.user.roomId = undefined;
        room.users = room.users.filter(id => id !== connection.user?.id);

        if (room.users.length === 0) {
            connection.server.rooms.delete(room.id);

            const packet = new PacketRoomInfoRemove();
            packet.id = room.id;
            connection.send(PacketType.RoomInfoRemove, packet);

            for (const otherConnection of connection.server.connections.values()) {
                if (!otherConnection.user) continue;

                if (otherConnection.user.roomId === room.id) otherConnection.user.roomId = undefined;
                otherConnection.send(PacketType.RoomInfoRemove, packet);
            }

            return;
        }

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