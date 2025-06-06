<script lang="ts">
    import * as TitleBar from "$lib/components/game/titleBar";
    import type { User } from "$lib/stores/users";

let { user }: { user?: User } = $props();
</script>

<style>
    .my-info {
        width: 210px;
        height: 200px;

        padding: 5px;
    }
</style>

<div class="my-info">
    <TitleBar.Root>
        <TitleBar.Title>
            <i class="fas fa-user" style="margin-right: 5px;"></i>
            내 정보
        </TitleBar.Title>
    </TitleBar.Root>
    {user?.username}
</div>