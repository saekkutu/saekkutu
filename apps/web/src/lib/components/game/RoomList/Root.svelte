<script>
    import * as RoomList from ".";
    import * as TitleBar from "../TitleBar";
    import { rooms } from "$lib/stores/rooms";
</script>

<div class="w-[800px] h-[370px] flex flex-col p-1">
    <TitleBar.Root>
        <TitleBar.Title>
            <i class="fas fa-bars mr-1"></i>
            방 목록 [{$rooms.length}개]
        </TitleBar.Title>
    </TitleBar.Root>

    <div class="grid grid-cols-2 gap-2 pb-1 overflow-y-auto">
        {#each $rooms as room}
            <RoomList.Item id={room.id} title={room.title} />
        {/each}
    </div>
</div>