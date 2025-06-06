import { writable } from 'svelte/store';

export interface Chat {
    head: string;
    body: string;
    time: string;
}

export const chats = writable<Chat[]>([]);

export const addChat = (chat: Chat) => {
    chats.update(currentChats => {
        if (!currentChats.find(c => c.time === chat.time)) {
            return [...currentChats, chat];
        }
        return currentChats;
    });
};

export const removeChat = (time: string) => {
    chats.update(currentChats => currentChats.filter(c => c.time !== time));
}; 

export const clearChat = () => {
    chats.set([]);
};