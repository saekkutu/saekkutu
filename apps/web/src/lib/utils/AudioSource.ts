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

    public source: AudioBufferSourceNode;
    public options: AudioSourceOptions;

    constructor(source: AudioBufferSourceNode, options?: AudioSourceOptions) {
        this.source = source;

        this.options = {
            ...defaultOptions,
            ...options,
        }
    }

    static async fromURL(url: string, options?: AudioSourceOptions) {
        const buffer = await fetch(url).then(res => res.arrayBuffer());
        return AudioSource.fromBuffer(buffer, options);
    }

    static async fromBuffer(buffer: ArrayBuffer, options?: AudioSourceOptions) {
        await AudioSource.waitForAudioContext();
        const source = AudioSource.audioContext.createBufferSource();
        source.buffer = await AudioSource.audioContext.decodeAudioData(buffer);
        return new AudioSource(source, options);
    }

    private static async waitForAudioContext() {
        while (!AudioSource.audioContext) {
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }

    async play() {
        await AudioSource.waitForAudioContext();

        if (this.options.volume !== 1) {
            const gainNode = AudioSource.audioContext.createGain();
            gainNode.gain.value = this.options.volume!;
            gainNode.connect(AudioSource.audioContext.destination);

            this.source.connect(gainNode);
        } else {
            this.source.connect(AudioSource.audioContext.destination);
        }

        this.source.loop = this.options.loop!;
        this.source.start();

        await AudioSource.audioContext.resume();
    }

    async stop() {
        await AudioSource.waitForAudioContext();

        this.source.stop();
    }
}