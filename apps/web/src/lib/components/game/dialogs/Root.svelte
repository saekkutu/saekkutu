<script lang="ts">
    import { dialogs } from "$lib/stores/dialogs";
    import * as TitleBar from "../TitleBar";
    import { onMount } from "svelte";

    let { id, title, children } = $props();

    let dialog: HTMLDivElement;
    let titleBar: HTMLDivElement;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (e: MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("close-button")) return;

        isDragging = true;

        e.preventDefault();
        offsetX = e.clientX - dialog.offsetLeft;
        offsetY = e.clientY - dialog.offsetTop;
    };

    const handleMouseUp = () => {
        isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            dialog.style.left = `${newX}px`;
            dialog.style.top = `${newY}px`;
        }
    };

    onMount(() => {
        titleBar.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
    });
</script>

<div class="
    fixed min-w-80 p-1
    top-1/2 left-1/2
    transform -translate-x-1/2 -translate-y-1/2
    bg-gray-200 rounded-lg shadow-lg
    border-1 border-gray-400
" bind:this={dialog}>
    <div class="cursor-move" bind:this={titleBar}>
        <TitleBar.Root spacing={0}>
            <TitleBar.Title>{title}</TitleBar.Title>
            <button aria-label="닫기" class="
                w-3 h-3
                rounded-full
                border-none
                bg-red-500 hover:bg-red-400
                cursor-default
                m-1
            " onclick={() => {
                $dialogs[id as keyof typeof $dialogs] = false;
            }}></button>
        </TitleBar.Root>
    </div>

    <div class="flex flex-col gap-1">
        {@render children()}
    </div>
</div>