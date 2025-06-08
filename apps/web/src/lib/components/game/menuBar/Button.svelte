<script lang="ts">
    import type { Snippet } from "svelte";
    import type { SvelteHTMLElements } from "svelte/elements";

    type Props = {
        children: Snippet,
        tiny?: boolean,
        color?: string,
    } & SvelteHTMLElements["button"];

    let {
        children,
        tiny = false,
        color = "rgb(142, 192, 243)",
        ...restProps
    }: Props = $props();
</script>

<button class={`
    button h-8
    rounded-xl rounded-b-none

    transition-normal duration-200 ease-in-out
    hover:mt-[-0.25rem] hover:h-9
    active:text-gray-100

    ${tiny ? "w-8" : "w-24"}
`} style={`background-color: ${color};`} {...restProps}>
    {@render children()}
</button>
