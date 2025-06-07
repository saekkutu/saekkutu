export class AudioSource {
    public static audioContext: AudioContext;

    public buffer: ArrayBuffer;
    public loop: boolean = false;
    public volume: number = 1;

    constructor(buffer: ArrayBuffer, loop: boolean = false, volume: number = 1) {
        this.buffer = buffer;
        this.loop = loop;
        this.volume = volume;
    }

    private static async waitForAudioContext() {
        while (!AudioSource.audioContext) {
            await new Promise(resolve => setTimeout(resolve, 1));
        }
    }

    static async fromURL(url: string, loop: boolean = false, volume: number = 1) {
        await AudioSource.waitForAudioContext();

        const buffer = await fetch(url).then(res => res.arrayBuffer());
        return new AudioSource(buffer, loop, volume);
    }

    async play() {
        await AudioSource.waitForAudioContext();

        const source = AudioSource.audioContext.createBufferSource();
        source.buffer = await AudioSource.audioContext.decodeAudioData(this.buffer);

        if (this.volume !== 1) {
            const gainNode = AudioSource.audioContext.createGain();
            gainNode.gain.value = this.volume;
            gainNode.connect(AudioSource.audioContext.destination);

            source.connect(gainNode);
        } else {
            source.connect(AudioSource.audioContext.destination);
        }

        source.loop = this.loop;
        source.start();

        await AudioSource.audioContext.resume();
    }
    
}