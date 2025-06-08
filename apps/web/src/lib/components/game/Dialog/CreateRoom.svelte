<script lang="ts">
    import * as Dialog from ".";
    import Input from "../Input.svelte";
    import Button from "../Button.svelte";

    import { PacketType, PacketRoomCreate } from "@saekkutu/protocol";
    import type { Client } from "$lib/client";
    import { getContext } from "svelte";
    import { dialogs } from "$lib/stores/dialogs";
    import { goto } from "$app/navigation";

    let title = $state("");
    
    const client: Client = getContext("client");

    function createRoom() {
        const packet = new PacketRoomCreate();
        packet.title = title;

        client.send(PacketType.RoomCreate, packet);
        $dialogs["createRoom"] = false;
    }
</script>

<Dialog.Root id="createRoom" title="방 만들기">
    <div class="flex flex-row justify-between items-center text-sm">
        <div class="w-24 text-center">방 제목</div>
        <Input class="flex-1" bind:value={title} />
    </div>
    <div class="flex justify-end">
        <Button onclick={createRoom}>만들기</Button>
    </div>
</Dialog.Root>