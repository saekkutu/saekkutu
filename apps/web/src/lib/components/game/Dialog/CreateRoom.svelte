<script>
    import * as Dialog from ".";
    import Input from "../Input.svelte";
    import Button from "../Button.svelte";
</script>

<Dialog.Root id="createRoom" title="방 만들기">
    <div class="flex flex-row justify-between items-center text-sm">
        <div class="w-24 text-center">방 제목</div>
        <Input class="flex-1" />
    </div>
    <div class="flex justify-end">
        <Button>만들기</Button>
    </div>
</Dialog.Root>