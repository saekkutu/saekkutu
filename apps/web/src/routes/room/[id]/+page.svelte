<script lang="ts">
    import * as Chat from "$lib/components/game/Chat";
    import * as MenuBar from "$lib/components/game/MenuBar";

    import { onMount } from "svelte";
    import { playLobby } from "$lib/stores/audios";
    import { Client } from "$lib/client";
    import { getContext } from "svelte";
    import { PacketRoomJoin, PacketRoomLeave, PacketType } from "@saekkutu/protocol";
    import { goto } from "$app/navigation";
    
    export let data: { id: number };

    const client: Client = getContext("client");

    onMount(async () => {
        await playLobby();

        const packet = new PacketRoomJoin();
        packet.id = data.id;
        client.send(PacketType.RoomJoin, packet);
    });
</script>

<div class="flex flex-col text-sm p-5">
    <MenuBar.Root>
        <MenuBar.Button color="rgb(255, 173, 173)" title="나가기" onclick={() => {
            client.send(PacketType.RoomLeave, new PacketRoomLeave());
            goto("/");
        }}>나가기</MenuBar.Button>
    </MenuBar.Root>
    <div class="flex flex-col bg-gray-200 w-[1010px] *:flex *:flex-row rounded-md rounded-tl-none">
        <div>
        </div>
        <div>
            <Chat.Root />
        </div>
    </div>
</div>