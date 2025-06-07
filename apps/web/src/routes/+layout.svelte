<script lang="ts">
    import * as MenuBar from "$lib/components/game/MenuBar";

    import { onMount, setContext } from "svelte";
    import { Client } from "$lib/client";
    import { AudioSource } from "$lib/utils";

    let { children } = $props();

    const client = new Client({ url: "ws://localhost:3000" });
    setContext("client", client);

    onMount(() => {
        AudioSource.audioContext = new AudioContext();
        client.connect();
    });
</script>

<style>
    .game-container {
        display: flex;
        flex-direction: column;
    }

    .game-screen {
        background-color: #EEEEEE;
        width: 1010px;

        display: flex;
        flex-direction: column;
    }
</style>

<div class="game-container">
    <MenuBar.Root />
    <div class="game-screen">
        {@render children()}
    </div>
</div>
