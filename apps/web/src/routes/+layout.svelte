<script lang="ts">
    import * as MenuBar from "$lib/components/game/menuBar";
    import { Client } from "$lib/client";
    import { onMount } from "svelte";

    let { children } = $props();

    let client: Client;
    onMount(() => {
        client = new Client({ url: "ws://localhost:3000" });
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
        flex: 1 auto;
        position: relative;
    }
</style>

<div class="game-container">
    <MenuBar.Root />
    <div class="game-screen">
        {@render children()}
    </div>
</div>
