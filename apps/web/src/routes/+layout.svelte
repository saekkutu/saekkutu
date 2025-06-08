<script lang="ts">
    import { onMount, setContext } from "svelte";
    import "../app.css";

    import * as MenuBar from "$lib/components/game/MenuBar";
    import * as Dialog from "$lib/components/game/Dialog";
    import { dialogs } from "$lib/stores/dialogs";
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

<div class="flex flex-col text-sm p-5">
    <MenuBar.Root/>
    <div class="flex flex-col bg-gray-200 w-[1010px] *:flex *:flex-row rounded-md rounded-tl-none">
        {@render children()}
    </div>
</div>

{#if $dialogs.createRoom}
    <Dialog.CreateRoom />
{/if}