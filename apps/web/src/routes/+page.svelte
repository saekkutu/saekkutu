<script lang="ts">
    import * as UserList from "$lib/components/game/userList";
    import * as Chat from "$lib/components/game/chat";
    import MyInfo from "$lib/components/game/MyInfo.svelte";
    import { currentUser } from "$lib/stores/users";
    import { onMount } from "svelte";
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
</div>
<div class="game-screen-content">
    <MyInfo user={$currentUser} />
    <Chat.Root />
</div>