import { PacketHello } from "@saekkutu/protocol";
import { Client } from "..";

export class HelloHandler {
    public static handle(client: Client, packet: PacketHello) {
        if (!packet.interval) throw new Error("Interval is not set");

        client.startHeartbeat(packet.interval);
        client.login("test");
    }
}