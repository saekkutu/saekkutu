<script>
    let { children, spacing = -1 } = $props();
</script>


<div class="bg-gray-300 rounded-lg mb-1 flex justify-between text-xs overflow-hidden border-1 border-gray-350" style="letter-spacing: {spacing}px;">
    {@render children()}
</div>