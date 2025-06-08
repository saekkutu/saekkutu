import { get, writable } from "svelte/store";
import { AudioSource, type AudioSourceOptions } from "$lib/utils";

export const audios = writable<Map<string, AudioSource>>(new Map());

export const addAudio = (id: string, source: AudioSource) => {
    audios.update(state => state.set(id, source));
}

export const playLobby = async () => {
    if (get(audios).get("lobby")) return;

    const source = await AudioSource.fromURL("/audio/lobby.mp3", { loop: true, volume: 0.5 });
    addAudio("lobby", source);
    await source.play();
}