import { PacketRoomInfoUpdate } from "@saekkutu/protocol";
import { Client } from "..";
import { getRoom, updateRoom } from "$lib/stores/rooms";
import { currentUser } from "$lib/stores/users";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export class RoomInfoUpdateHandler {
    public static handle(_client: Client, packet: PacketRoomInfoUpdate) {
        if (!packet.id || !packet.title || !packet.creator || !packet.users) return;

        const room = getRoom(packet.id);
        if (!room && packet.creator === get(currentUser)?.id) goto(`/room/${packet.id}`);

        updateRoom({ id: packet.id, title: packet.title, creator: packet.creator, users: packet.users });
    }
}