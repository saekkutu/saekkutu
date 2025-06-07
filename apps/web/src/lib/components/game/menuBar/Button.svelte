<script lang="ts">
    import type { Snippet } from "svelte";

    let { tiny, color, children, title, onClick }: {
        tiny?: boolean,
        color: string,
        children: Snippet,
        title?: string,
        onClick?: () => void
    } = $props()
</script>

<style>
    .button {
        font-family: inherit;
        border: none;
        transition: all 0.2s ease;

        width: 90px;
        height: 20px;
        padding: 5px;

        border-radius: 10px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;

        box-sizing: inherit;

        float: left;
    }

    .button:hover {
        margin-top: -5px;
        height: 25px;
    }

    .button:active {
        color: #EEEEEE;
    }

    .tiny {
        width: 20px;
    }
</style>

<button class={`button ${tiny ? "tiny" : ""}`} style={`
    background-color: ${color};
`} title={title} onclick={() => onClick?.()}>
    {@render children()}
</button>
