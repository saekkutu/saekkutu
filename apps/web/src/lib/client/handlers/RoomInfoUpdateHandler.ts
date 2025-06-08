import { PacketRoomInfoUpdate } from "@saekkutu/protocol";
import { Client } from "..";
import { addRoom } from "$lib/stores/rooms";

export class RoomInfoUpdateHandler {
    public static handle(client: Client, packet: PacketRoomInfoUpdate) {
        if (!packet.id || !packet.title) return;

        addRoom({ id: packet.id, title: packet.title });
    }
}