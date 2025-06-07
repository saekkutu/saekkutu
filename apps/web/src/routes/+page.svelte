<script lang="ts">
    import * as UserList from "$lib/components/game/UserList";
    import * as Chat from "$lib/components/game/Chat";
    import * as RoomList from "$lib/components/game/RoomList";
    import MyInfo from "$lib/components/game/MyInfo.svelte";

    import { onMount } from "svelte";
    import { currentUser } from "$lib/stores/users";
    import { AudioSource } from "$lib/utils";

    onMount(async () => {
        const source = await AudioSource.fromURL("/audio/lobby.mp3", { loop: true, volume: 0.5 });
        await source.play();
    });
</script>

<style>
    .game-screen-content {
        display: flex;
        flex-direction: row;
    }
</style>

<div class="game-screen-content">
    <UserList.Root />
    <RoomList.Root />
</div>
<div class="game-screen-content">
    <MyInfo user={$currentUser} />
    <Chat.Root />
</div>