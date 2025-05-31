<script>
    let { children } = $props();
</script>

<style>
    .title-bar {
        width: 100%;

        background-color: #DDDDDD;
        color: #222222;

        border-radius: 5px;
        margin-bottom: 5px;

        display: flex;
        justify-content: space-between;

        font-size: 11px;
        letter-spacing: -1px;

        overflow: hidden;

        border-bottom: 1px solid #CCCCCC;
    }
</style>

<div class="title-bar">
    {@render children()}
</div>