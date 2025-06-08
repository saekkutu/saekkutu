import { PacketRoomInfoRemove } from "@saekkutu/protocol";
import { Client } from "..";
import { removeRoom } from "$lib/stores/rooms";

export class RoomInfoRemoveHandler {
    public static handle(_client: Client, packet: PacketRoomInfoRemove) {
        if (!packet.id) return;
        removeRoom(packet.id);
    }
}