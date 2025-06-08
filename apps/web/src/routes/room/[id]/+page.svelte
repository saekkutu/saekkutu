<script lang="ts">
    import * as Chat from "$lib/components/game/Chat";
    import * as RoomList from "$lib/components/game/RoomList";
    import * as MenuBar from "$lib/components/game/MenuBar";

    import { onMount } from "svelte";
    import { playLobby } from "$lib/stores/audios";

    onMount(async () => {
        await playLobby();
    });
</script>

<div class="flex flex-col text-sm p-5">
    <MenuBar.Root>
        <MenuBar.Button color="rgb(255, 173, 173)" title="나가기">나가기</MenuBar.Button>
    </MenuBar.Root>
    <div class="flex flex-col bg-gray-200 w-[1010px] *:flex *:flex-row rounded-md rounded-tl-none">
        <div>
        </div>
        <div>
            <Chat.Root />
        </div>
    </div>
</div>