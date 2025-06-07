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

<input 
    type="text" 
    bind:value
    class={`
        p-1 bg-white
        border-1 border-gray-400 outline-none
        rounded-lg
        ${className}
    `}
    {...restProps}
/>