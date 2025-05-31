<script>
    import MenuBar from "./MenuBar.svelte";
    import UserList from "./UserList.svelte";

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
    <MenuBar />
    <div class="game-screen">
        <UserList />
    </div>
</div>
