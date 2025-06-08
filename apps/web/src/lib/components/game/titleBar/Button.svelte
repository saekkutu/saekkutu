<script>
    let { children, rightSide = false } = $props();
</script>

<button class={`
    px-1.5 h-auto
    text-xs 
    bg-gray-350 hover:bg-gray-300
    transition-colors duration-200 ease-in-out
    ${rightSide ? 'rounded-r-lg' : ''}
`}>
    {@render children()}
</button>