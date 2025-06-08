<script lang="ts">
    import type { Snippet } from "svelte";
    import type { SvelteHTMLElements } from "svelte/elements";

    type Props = {
        children: Snippet;
        class?: string;
    } & SvelteHTMLElements["button"];

    let {
        children,
        class: className = "",
        ...restProps
    }: Props = $props();
</script>

<button class={`
    px-5 py-1 bg-gray-200 border-1 border-gray-400 rounded-lg
    transition-colors duration-200 ease-in-out active:bg-gray-400
    ${className}
`} {...restProps}>
    {@render children()}
</button>
