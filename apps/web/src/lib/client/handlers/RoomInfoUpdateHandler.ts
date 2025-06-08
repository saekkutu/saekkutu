import { PacketRoomInfoUpdate } from "@saekkutu/protocol";
import { Client } from "..";
import { addRoom } from "$lib/stores/rooms";
import { currentUser } from "$lib/stores/users";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export class RoomInfoUpdateHandler {
    public static handle(_client: Client, packet: PacketRoomInfoUpdate) {
        if (!packet.id || !packet.title || !packet.owner) return;

        addRoom({ id: packet.id, title: packet.title, owner: packet.owner });
        if (packet.owner === get(currentUser)?.id) goto(`/room/${packet.id}`);
    }
}