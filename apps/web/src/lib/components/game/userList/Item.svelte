<script>
    let { children } = $props();
</script>

<div class="w-full h-5 p-1 rounded-md flex items-center hover:cursor-pointer hover:bg-gray-300">
    {@render children()}
</div>