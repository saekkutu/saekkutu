<script lang="ts">
    import type { SvelteHTMLElements } from "svelte/elements";

    type Props = {
        value?: string;
        class?: string;
    } & SvelteHTMLElements["input"];

    let {
        value = $bindable(""),
        class: className = "",
        ...restProps
    }: Props = $props();
</script>

<style>
    input {
        padding: 5px;

        border: 1px solid #AAAAAA;
        border-radius: 10px;

        outline: none;
    }
</style>

<input 
    type="text" 
    bind:value
    class={className}
    {...restProps}
/>