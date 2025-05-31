<script>
    let { children } = $props();
</script>

<style>
    .user-list-item {
        width: 100%;
        height: 20px;

        display: flex;
        align-items: center;
    }

    .user-list-item:hover {
        cursor: pointer;
        background-color: #F4F4F4;
    }
</style>

<div class="user-list-item">
    {@render children()}
</div>