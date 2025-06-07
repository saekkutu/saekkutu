<script>
    import * as TitleBar from "../TitleBar";
    import { Item } from ".";
    import { users } from "$lib/stores/users";
</script>

<div class="w-[210px] h-[370px] p-1">
    <TitleBar.Root>
        <TitleBar.Title>
            <i class="fas fa-users" style="margin-right: 5px;"></i>
            {"<"}<b>감자</b>{">"} 
            접속자 목록 [{$users.length}명]
        </TitleBar.Title>

        <TitleBar.Button rightSide>
            <i class="fas fa-sort-numeric-asc"></i>
            
        </TitleBar.Button>
    </TitleBar.Root>

    <div class="h-[335px] text-xs overflow-y-scroll">
        {#each $users as user}
            <Item>{user.username}</Item>
        {/each}
    </div>
</div>