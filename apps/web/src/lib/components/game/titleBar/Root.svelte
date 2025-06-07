<script>
    let { children, spacing = -1 } = $props();
</script>

<style>
    .title-bar {
        background-color: #DDDDDD;
        color: #222222;

        border-radius: 5px;
        margin-bottom: 5px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 11px;

        overflow: hidden;
        border-bottom: 1px solid #CCCCCC;
    }
</style>

<div class="title-bar" style="letter-spacing: {spacing}px;">
    {@render children()}
</div>