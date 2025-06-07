<script lang="ts">
    import * as TitleBar from "$lib/components/game/TitleBar";
    import * as Chat from "$lib/components/game/Chat";
    import Input from "../Input.svelte";
    import Button from "../Button.svelte";

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

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "Enter") handleSubmit();
    }

    function handleSubmit() {
        if (!message.trim() || !Client.instance) return;
        
        const packet = new PacketChatMessage();
        packet.message = message;
        Client.instance.send(PacketType.ChatMessage, packet);

        message = "";
    }
</script>

<div class="w-[800px] h-[200px] p-2 flex flex-col justify-between">
    <TitleBar.Root>
        <TitleBar.Title>
            <i class="fas fa-comments" style="margin-right: 5px;"></i>
            채팅
        </TitleBar.Title>
    </TitleBar.Root>

    <div class="text-xs flex-1 overflow-y-auto flex flex-col" bind:this={chatContentElement}>
        {#each $chats as chat}
            <Chat.Item head={chat.head} body={chat.body} time={chat.time} />
        {/each}
    </div>

    <div class="w-full h-8 flex flex-row justify-between">
        <Input 
            placeholder="메시지를 입력하세요"
            bind:value={message}
            onkeypress={handleKeyPress}
            style="border-right: none; border-radius: 10px 0px 0px 10px; width: 100%;"
        />
        <Button style="border-left: none; border-radius: 0px 10px 10px 0px; flex-shrink: 0;" onclick={handleSubmit}>전송</Button>
    </div>
</div>