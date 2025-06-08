<script>
    import { rooms } from "$lib/stores/rooms";

    let { id } = $props();

    const room = $derived($rooms.find(room => room.id === id));
</script>

<a href={`/room/${id}`} draggable={false} class="flex flex-row justify-between items-center py-1 bg-gray-100 rounded-md border-1 border-gray-350 shadow-sm cursor-pointer">
    <div class="h-full flex flex-row items-center">
        <div class="min-w-15 h-11/12 flex items-center justify-center text-center text-xl border-r-1 border-gray-400">
            {id}
        </div>

        <div class="flex flex-col ml-2 py-1">
            <div class="text-base font-bold">
                {room?.title}
            </div>
            <div class="text-xs">
                한글 끝말잇기
            </div>
            <div class="flex flex-row gap-3 text-xs">
                <div>라운드 1</div>
                <div>150초</div>
            </div>
        </div>
    </div>

    <div class="h-full flex flex-col justify-between mr-3 text-xs text-right">
        <div class="mt-1">{room?.users.length} / 8</div>
        <div class="text-2xl"><div class="fas fa-lock-open"></div></div>
    </div>
</a>