<script>
    let { head, body, time } = $props();
</script>

<div class="flex flex-row justify-between m-0.5">
    <div class="flex flex-row gap-2">
        <div class="w-24 text-center font-bold overflow-hidden text-ellipsis cursor-pointer hover:bg-white">
            {head}
        </div>
    
        <div class="break-all">
            {body}
        </div>
    </div>

    <div class="shrink-0 text-xs text-gray-400">
        {time}
    </div>
</div>