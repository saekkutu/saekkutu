<script>
    import * as UserList from "$lib/components/game/userList";
    import * as Chat from "$lib/components/game/chat";
    import MyInfo from "$lib/components/game/MyInfo.svelte";
    import { users } from "$lib/stores/users";
</script>

<style>
    .game-screen-content {
        display: flex;
        flex-direction: row;
    }
</style>

<div class="game-screen-content">
    <UserList.Root />
</div>
<div class="game-screen-content">
    <MyInfo user={$users.find(user => user.isMe)} />
    <Chat.Root />
</div>