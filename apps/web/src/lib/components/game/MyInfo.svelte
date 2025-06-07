<script lang="ts">
    import * as TitleBar from "$lib/components/game/TitleBar";

    let { user } = $props();
</script>

<div class="w-[210px] h-[200px] p-1">
    <TitleBar.Root>
        <TitleBar.Title>
            <i class="fas fa-user" style="margin-right: 5px;"></i>
            내 정보
        </TitleBar.Title>
    </TitleBar.Root>
    {user?.username}
</div>