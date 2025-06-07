import { PacketUserInfoUpdate } from "@saekkutu/protocol";
import { Client } from "..";
import { addUser } from "$lib/stores/users";

export class UserInfoUpdateHandler {
    public static handle(_client: Client, packet: PacketUserInfoUpdate) {
        if (!packet.id || !packet.username) throw new Error("Id or username is not set");

        addUser({ id: packet.id, username: packet.username, isMe: false });
    }
}