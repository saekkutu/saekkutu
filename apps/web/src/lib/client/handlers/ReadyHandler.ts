import { PacketReady } from "@saekkutu/protocol";
import { addUser } from "$lib/stores/users";
import { Client } from "..";

export class ReadyHandler {
    public static handle(_client: Client, packet: PacketReady) {
        if (!packet.id || !packet.username) throw new Error("Id or username is not set");

        addUser({ id: packet.id, username: packet.username, isMe: true });
    }
}