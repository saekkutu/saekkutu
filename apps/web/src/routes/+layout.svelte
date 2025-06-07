<script lang="ts">
    import { onMount, setContext } from "svelte";
    import "../app.css";

    import * as MenuBar from "$lib/components/game/MenuBar";
    import { dialogs } from "$lib/stores/dialogs";
    import { Client } from "$lib/client";
    import { AudioSource } from "$lib/utils";
    import { CreateRoomDialog } from "$lib/components/game/dialogs";

    let { children } = $props();

    const client = new Client({ url: "ws://localhost:3000" });
    setContext("client", client);

    onMount(() => {
        AudioSource.audioContext = new AudioContext();
        client.connect();
    });
</script>

<div class="flex flex-col text-sm p-5">
    <MenuBar.Root/>
    <div class="flex flex-col bg-[#EEEEEE] w-[1010px] *:flex *:flex-row">
        {@render children()}
    </div>
</div>

{#if $dialogs.createRoom}
    <CreateRoomDialog />
{/if}