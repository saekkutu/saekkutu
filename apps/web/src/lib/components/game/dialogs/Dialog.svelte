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

<style>
    .dialog {
        position: fixed;
        min-width: 310px;
        padding: 5px;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        border-radius: 10px;
        color: #111111;

        background-color: #EEEEEE;
        box-shadow: 0px 1px 1px #141414;
    }

    .title-bar {
        cursor: move;
    }

    .close-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #EE5555;
        margin: 3px;
        cursor: default;
        border: none;
    }
    
    .close-button:hover {
        background-color: #EE7777;
    }

    .dialog-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
</style>

<div class="dialog" bind:this={dialog}>
    <div class="title-bar" bind:this={titleBar}>
        <TitleBar.Root spacing={0}>
            <TitleBar.Title>{title}</TitleBar.Title>
            <button aria-label="닫기" class="close-button" onclick={() => {
                $dialogs[id as keyof typeof $dialogs] = false;
            }}></button>
        </TitleBar.Root>
    </div>

    <div class="dialog-content">
        {@render children()}
    </div>
</div>