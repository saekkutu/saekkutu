import { writable } from 'svelte/store';

export interface Room {
    id: number;
    title: string;
    owner: number;
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

export const removeRoom = (id: number) => {
    rooms.update(currentRooms => currentRooms.filter(r => r.id !== id));
};

export const clearRooms = () => {
    rooms.set([]);
};