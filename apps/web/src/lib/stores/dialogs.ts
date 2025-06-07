import { writable } from "svelte/store";

export const dialogs = writable<{
    createRoom: boolean
}>({
    createRoom: false
})