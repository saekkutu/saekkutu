<script lang="ts">
    import * as TitleBar from "$lib/components/game/TitleBar";
    import * as Chat from "$lib/components/game/Chat";
    import { onMount, tick } from "svelte";
    import { chats } from "$lib/stores/chat";
    import { PacketChatMessage, PacketType } from "@saekkutu/protocol";
    import { Client } from "$lib/client";

    let message = "";
    let chatContentElement: HTMLElement;
    let isUserScrolling = false;

    onMount(() => {
        const handleScroll = () => {
            if (chatContentElement) {
                const isScrolledToBottom = chatContentElement.scrollHeight - chatContentElement.clientHeight <= chatContentElement.scrollTop + 1;
                isUserScrolling = !isScrolledToBottom;
            }
        }

        chatContentElement.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            chatContentElement.removeEventListener('scroll', handleScroll)
        }
    });

    $: if ($chats) {
        autoscroll();
    }

    async function autoscroll() {
        await tick();
        if (chatContentElement && !isUserScrolling) {
            chatContentElement.scrollTop = chatContentElement.scrollHeight;
        }
    }

    function handleSubmit() {
        if (!message.trim() || !Client.instance) return;
        
        const packet = new PacketChatMessage();
        packet.message = message;
        Client.instance.send(PacketType.ChatMessage, packet);

        message = "";
    }

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") {
            handleSubmit();
        }
    }
</script>

<style>
    .chat {
        width: 800px;
        height: 200px;

        padding: 5px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .chat-content {
        font-size: 12px;
        flex: 1;

        overflow-y: auto;
        padding: 5px;
        
        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .chat-input {
        width: 100%;
        height: 31px;
        flex-shrink: 0;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .chat-input input {
        width: 100%;
        padding: 5px;

        border: 1px solid #AAAAAA;
        border-right: none;
        border-radius: 10px 0px 0px 10px;

        outline: none;
    }

    .chat-input button {
        width: 70px;
        height: 100%;
        padding: 5px;

        border: 1px solid #AAAAAA;
        border-left: none;
        border-radius: 0px 10px 10px 0px;
    }
</style>

<div class="chat">
    <TitleBar.Root>
        <TitleBar.Title>
            <i class="fas fa-comments" style="margin-right: 5px;"></i>
            채팅
        </TitleBar.Title>
    </TitleBar.Root>

    <div class="chat-content" bind:this={chatContentElement}>
        {#each $chats as chat}
            <Chat.Item head={chat.head} body={chat.body} time={chat.time} />
        {/each}
    </div>

    <div class="chat-input">
        <input 
            type="text" 
            placeholder="메시지를 입력하세요" 
            bind:value={message}
            on:keypress={handleKeyPress}
        />
        <button on:click={handleSubmit}>전송</button>
    </div>
</div>