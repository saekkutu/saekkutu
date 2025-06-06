import { derived, writable } from 'svelte/store';

export interface User {
    id: number;
    username: string;
    isMe: boolean;
}

export const users = writable<User[]>([]);

export const addUser = (user: User) => {
    users.update(currentUsers => {
        if (!currentUsers.find(u => u.id === user.id)) {
            return [...currentUsers, user];
        }
        return currentUsers;
    });
};

export const removeUser = (id: number) => {
    users.update(currentUsers => currentUsers.filter(u => u.id !== id));
}; 

export const clearUsers = () => {
    users.set([]);
};

export const currentUser = derived(users, $users => $users.find(u => u.isMe));