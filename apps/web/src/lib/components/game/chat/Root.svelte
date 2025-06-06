<script lang="ts">
    import * as TitleBar from "$lib/components/game/titleBar";
    import * as Chat from "$lib/components/game/chat";
    import { Client } from "$lib/client";
    import { getContext } from "svelte";
    import { addChat, chats } from "$lib/stores/chat";
    import { PacketChatMessage, PacketType } from "@saekkutu/protocol";
    import { currentUser } from "$lib/stores/users";

    let message = "";
    const client: Client = getContext("client");

    function handleSubmit() {
        if (!message.trim() || !client) return;
        
        const packet = new PacketChatMessage();
        packet.message = message;
        client.send(PacketType.ChatMessage, packet);
        
        addChat({
            head: $currentUser?.username ?? "Unknown",
            body: message,
            time: new Date().toLocaleTimeString()
        });

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
        padding: 5px;
        flex-grow: 1;

        overflow-y: scroll;

        display: flex;
        flex-direction: column;
        gap: 1px;
    }

    .chat-input {
        width: 100%;
        height: 31px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .chat-input input {
        width: 100%;
        padding: 5px;

        border: 1px solid #AAAAAA;
        border-radius: 10px 0px 0px 10px;

        outline: none;
    }

    .chat-input button {
        width: 70px;
        height: 100%;
        padding: 5px;

        border: 1px solid #AAAAAA;
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

    <div class="chat-content">
        {#each $chats as chat}
            <Chat.Item head={chat.head} body={chat.body} time={chat.time} />
        {/each}
    </div>

    <div class="chat-input">
        <input 
            type="text" 
            placeholder="메시지를 입력하세요." 
            bind:value={message}
            on:keypress={handleKeyPress}
        />
        <button on:click={handleSubmit}>전송</button>
    </div>
</div>