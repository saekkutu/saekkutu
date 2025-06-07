<script>
    let { children, rightSide = false } = $props();
</script>

<button class={`
    px-1.5 h-auto
    text-xs 
    bg-gray-250 hover:bg-gray-350
    transition-all duration-200 ease-in-out
    border-1 border-gray-400
    ${rightSide ? 'rounded-r-lg' : ''}
`}>
    {@render children()}
</button>