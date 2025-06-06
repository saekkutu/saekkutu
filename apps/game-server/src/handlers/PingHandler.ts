import { PacketPing, PacketPong, PacketType } from "@saekkutu/protocol";
import { Connection } from "../connection";

export class PingHandler {
    public static handle(connection: Connection, _packet: PacketPing) {
        connection.updateLastPingTime();
        connection.send(PacketType.Pong, new PacketPong());
    }
}