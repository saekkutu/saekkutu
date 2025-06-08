import { writable } from 'svelte/store';

export interface Room {
    id: string;
    title: string;
}

export const rooms = writable<Room[]>([]);

export const addRoom = (room: Room) => {
    rooms.update(currentRooms => {
        if (!currentRooms.find(r => r.id === room.id)) {
            return [...currentRooms, room];
        }
        return currentRooms;
    });
};

export const removeRoom = (id: string) => {
    rooms.update(currentRooms => currentRooms.filter(r => r.id !== id));
};

export const clearRooms = () => {
    rooms.set([]);
};