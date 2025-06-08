<script lang="ts">
    import * as UserList from "$lib/components/game/UserList";
    import * as Chat from "$lib/components/game/Chat";
    import * as RoomList from "$lib/components/game/RoomList";
    import * as MenuBar from "$lib/components/game/MenuBar";
    import MyInfo from "$lib/components/game/MyInfo.svelte";
    import { Client } from "$lib/client";
    import { onMount } from "svelte";
    import { currentUser } from "$lib/stores/users";
    import { playLobby } from "$lib/stores/audios";
    import { dialogs } from "$lib/stores/dialogs";
    import { currentRoom } from "$lib/stores/rooms";
    import { PacketRoomLeave, PacketType } from "@saekkutu/protocol";
    import { getContext } from "svelte";

    const client: Client = getContext("client");

    onMount(async () => {
        await playLobby();
        if ($currentRoom) client.send(PacketType.RoomLeave, new PacketRoomLeave());
    });
</script>

<div class="flex flex-col text-sm p-5">
    <MenuBar.Root>
        <MenuBar.Button color="rgb(142, 192, 243)" onclick={() => { dialogs.update(state => ({ ...state, createRoom: !state.createRoom })); }}>
            방 만들기
        </MenuBar.Button>
    </MenuBar.Root>

    <div class="flex flex-col bg-gray-200 w-[1010px] *:flex *:flex-row rounded-md rounded-tl-none">
        <div>
            <UserList.Root />
            <RoomList.Root />
        </div>
        <div>
            <MyInfo user={$currentUser} />
            <Chat.Root />
        </div>
    </div>
</div>