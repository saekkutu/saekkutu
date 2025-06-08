<script lang="ts">
    import { Button } from ".";
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import { dialogs } from "$lib/stores/dialogs";

    let { children } = $props();
</script>

<div class="flex flex-row">
    {@render children()}
</div>

