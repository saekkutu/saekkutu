import { PacketChatBroadcast } from "@saekkutu/protocol";
import { Client } from "..";

import { get } from "svelte/store";
import { users } from "$lib/stores/users";
import { addChat } from "$lib/stores/chat";

export class ChatBroadcastHandler {
    public static handle(_client: Client, packet: PacketChatBroadcast) {
        if (!packet.id || !packet.message) throw new Error("Id or message is not set");

        const user = get(users).find(user => user.id === packet.id);
        if (!user) return;

        const head = user.username;
        const time = new Date().toLocaleTimeString();

        addChat({ head: head, body: packet.message, time: time });
    }
}