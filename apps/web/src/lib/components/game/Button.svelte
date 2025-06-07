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

<style>
    .button {
        padding: 5px 20px;

        border: 1px solid #AAAAAA;
        border-radius: 10px;
    }
</style>

<button class="button" {...restProps}>
    {@render children()}
</button>
