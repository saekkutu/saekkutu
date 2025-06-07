<script>
    let { children, rightSide = false } = $props();
</script>

<style>
    .title-bar-button {
        padding: 1px 15px;

        font-size: inherit;
        letter-spacing: inherit;

        background: #d2d2d2;
        border: 1px solid #bfbfbf;

        transition: all 0.2s ease;
    }

    .title-bar-button.right-side {
        border-radius: 0px 5px 5px 0px;
    }

    .title-bar-button:hover {
        background: #EEEEEE;
    }
</style>

<button class={`title-bar-button ${rightSide ? 'right-side' : ''}`}>
    {@render children()}
</button>