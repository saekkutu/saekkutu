<script>
    let { children } = $props();
</script>

<style>
    .title-bar-title {
        padding: 3px;
        
        font-size: inherit;
        letter-spacing: inherit;
    }
</style>

<div class="title-bar-title">
    {@render children()}
</div>