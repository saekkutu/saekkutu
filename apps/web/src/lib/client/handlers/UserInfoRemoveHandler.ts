import { PacketUserInfoRemove } from "@saekkutu/protocol";
import { removeUser } from "$lib/stores/users";
import { Client } from "..";

export class UserInfoRemoveHandler {
    public static handle(_client: Client, packet: PacketUserInfoRemove) {
        if (!packet.id) throw new Error("Id is not set");

        removeUser(packet.id);
    }
}