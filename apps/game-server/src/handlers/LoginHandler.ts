import { PacketLogin, PacketReady, PacketType, PacketUserInfoUpdate } from "@saekkutu/protocol";
import { Connection } from "../connection";
import { User } from "../user";
import { randomInt } from "crypto";

export class LoginHandler {
    public static handle(connection: Connection, packet: PacketLogin) {
        if (!packet.username) throw new Error("Username is not set");

        const randomId = randomInt(1, 1000000);
        connection.user = new User(randomId, `Unknown${randomId}`);

        const readyPacket = new PacketReady();
        readyPacket.id = connection.user.id;
        readyPacket.username = connection.user.name;
        connection.send(PacketType.Ready, readyPacket);

        const updatePacket = new PacketUserInfoUpdate();
        updatePacket.id = connection.user.id;
        updatePacket.username = connection.user.name;

        const otherConnections = Array.from(connection.server.connections.values());
        for (const otherConnection of otherConnections) {
            if (otherConnection.id === connection.id) continue;
            if (!otherConnection.user) continue;

            otherConnection.send(PacketType.UserInfoUpdate, updatePacket);

            const otherUpdatePacket = new PacketUserInfoUpdate();
            otherUpdatePacket.id = otherConnection.user.id;
            otherUpdatePacket.username = otherConnection.user.name;

            connection.send(PacketType.UserInfoUpdate, otherUpdatePacket);
        }
    }
}