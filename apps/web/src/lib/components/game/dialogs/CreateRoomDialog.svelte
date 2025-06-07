<script>
    import Input from "../Input.svelte";
    import Dialog from "./Dialog.svelte";
    import Button from "../Button.svelte";
</script>

<style>
    .input-container {
        display: flex;
        flex-direction: row;
        justify-content:  space-between;
        align-items: center;
        font-size: 13px;
    }

    .input-title {
        width: 100px;
        text-align: center;
    }
</style>

<Dialog id="createRoom" title="방 만들기">
    <div class="input-container">
        <div class="input-title">방 제목</div>
        <Input style="flex: 1;" />
    </div>
    <div style="display: flex; justify-content: flex-end;">
        <Button>만들기</Button>
    </div>
</Dialog>