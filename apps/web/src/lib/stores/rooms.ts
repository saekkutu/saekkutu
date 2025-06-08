import { derived, get, writable } from 'svelte/store';
import { currentUser } from './users';

export interface Room {
    id: number;
    title: string;
    creator: number;
    users: number[];
}

export const rooms = writable<Room[]>([]);

export const getRoom = (id: number) => {
    return get(rooms).find(r => r.id === id);
};

export const updateRoom = (room: Room) => {
    rooms.update(currentRooms => {
        const index = currentRooms.findIndex(r => r.id === room.id);
        if (index === -1) return [...currentRooms, room];
        currentRooms[index] = room;
        return currentRooms;
    });
};

export const removeRoom = (id: number) => {
    rooms.update(currentRooms => currentRooms.filter(r => r.id !== id));
};

export const clearRooms = () => {
    rooms.set([]);
};

export const currentRoom = derived([rooms, currentUser], ([$rooms, $currentUser]) => {
    if (!$currentUser) return undefined;
    const room = $rooms.find(r => r.users.includes($currentUser.id));
    if (!room) return undefined;
    return room;
});