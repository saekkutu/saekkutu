import { PacketPong } from "@saekkutu/protocol";
import { Client } from "..";

export class PongHandler {
    public static handle(client: Client, _packet: PacketPong) {
        client.lastPongTime = Date.now();
    }
}