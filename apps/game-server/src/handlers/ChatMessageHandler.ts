import { PacketChatBroadcast, PacketChatMessage, PacketType } from "@saekkutu/protocol";
import { Connection } from "../connection";

export class ChatMessageHandler {
    public static handle(connection: Connection, packet: PacketChatMessage) {
        if (!packet.message) throw new Error("Message is not set");
        if (!connection.user) throw new Error("This connection does not have a user");

        const broadcastPacket = new PacketChatBroadcast();
        broadcastPacket.id = connection.user.id;
        broadcastPacket.message = packet.message.slice(0, 100);

        for (const otherConnection of connection.server.connections.values()) {
            if (!otherConnection.user) continue;
            otherConnection.send(PacketType.ChatBroadcast, broadcastPacket);
        }
    }
}