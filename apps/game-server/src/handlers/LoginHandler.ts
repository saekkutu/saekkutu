import { PacketLogin, PacketReady, PacketRoomInfoUpdate, PacketType, PacketUserInfoUpdate } from "@saekkutu/protocol";
import { Connection } from "../connection";
import { User } from "../user";
import { randomInt } from "crypto";

export class LoginHandler {
    public static handle(connection: Connection, packet: PacketLogin) {
        if (!packet.username) throw new Error("Username is not set");

        const randomId = randomInt(1, 1000000);
        connection.user = new User(randomId, `새끄투${randomId}`);

        const readyPacket = new PacketReady();
        readyPacket.id = connection.user.id;
        readyPacket.username = connection.user.name;
        connection.send(PacketType.Ready, readyPacket);

        const updatePacket = new PacketUserInfoUpdate();
        updatePacket.id = connection.user.id;
        updatePacket.username = connection.user.name;

        for (const otherConnection of Array.from(connection.server.connections.values())) {
            if (otherConnection.id === connection.id) continue;
            if (!otherConnection.user) continue;

            otherConnection.send(PacketType.UserInfoUpdate, updatePacket);

            const otherUpdatePacket = new PacketUserInfoUpdate();
            otherUpdatePacket.id = otherConnection.user.id;
            otherUpdatePacket.username = otherConnection.user.name;

            connection.send(PacketType.UserInfoUpdate, otherUpdatePacket);
        }

        for (const room of Array.from(connection.server.rooms.values())) {
            const roomInfoUpdatePacket = new PacketRoomInfoUpdate();
            roomInfoUpdatePacket.id = room.id;
            roomInfoUpdatePacket.title = room.title;
            roomInfoUpdatePacket.creator = room.creator;
            roomInfoUpdatePacket.users = room.users;

            connection.send(PacketType.RoomInfoUpdate, roomInfoUpdatePacket);
        }
    }
}