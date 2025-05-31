<script>
    import * as MenuBar from "./menuBar";
    import * as UserList from "./userList";
    import Client from "$lib/client";

    let client = new Client();
    client.connect();
</script>

<style>
    .game-container {
        display: flex;
        flex-direction: column;
    }

    .game-screen {
        background-color: #EEEEEE;
        width: 1010px;

        display: flex;
        flex: 1 auto;
        position: relative;
    }
</style>

<div class="game-container">
    <MenuBar.Root />
    <div class="game-screen">
        <UserList.Root />
    </div>
</div>
