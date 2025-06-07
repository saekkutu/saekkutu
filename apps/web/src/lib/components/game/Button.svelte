<script lang="ts">
    import type { Snippet } from "svelte";
    import type { SvelteHTMLElements } from "svelte/elements";

    type Props = {
        children: Snippet;
    } & SvelteHTMLElements["button"];

    let {
        children,
        ...restProps
    }: Props = $props();
</script>

<button class="px-5 py-1 bg-gray-200 border-1 border-gray-400 rounded-lg" {...restProps}>
    {@render children()}
</button>
