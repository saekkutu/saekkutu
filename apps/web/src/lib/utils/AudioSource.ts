export interface AudioSourceOptions {
    loop?: boolean;
    volume?: number;
}

const defaultOptions: AudioSourceOptions = {
    loop: false,
    volume: 1,
}

export class AudioSource {
    public static audioContext: AudioContext;

    public buffer: ArrayBuffer;
    public options: AudioSourceOptions;

    constructor(buffer: ArrayBuffer, options?: AudioSourceOptions) {
        this.buffer = buffer;
        this.options = {
            ...defaultOptions,
            ...options,
        }
    }

    static async fromURL(url: string, options?: AudioSourceOptions) {
        await AudioSource.waitForAudioContext();

        const buffer = await fetch(url).then(res => res.arrayBuffer());
        return new AudioSource(buffer, options);
    }

    private static async waitForAudioContext() {
        while (!AudioSource.audioContext) {
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }

    async play() {
        await AudioSource.waitForAudioContext();

        const source = AudioSource.audioContext.createBufferSource();
        source.buffer = await AudioSource.audioContext.decodeAudioData(this.buffer);

        if (this.options.volume !== 1) {
            const gainNode = AudioSource.audioContext.createGain();
            gainNode.gain.value = this.options.volume!;
            gainNode.connect(AudioSource.audioContext.destination);

            source.connect(gainNode);
        } else {
            source.connect(AudioSource.audioContext.destination);
        }

        source.loop = this.options.loop!;
        source.start();

        await AudioSource.audioContext.resume();
    }
    
}