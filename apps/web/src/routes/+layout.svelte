<script lang="ts">
    import { onMount, setContext } from "svelte";
    import "../app.css";

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

{@render children()}

{#if $dialogs.createRoom}
    <Dialog.CreateRoom />
{/if}