// Everything here is big endian
export class PacketBuffer {
    private static TEXT_ENCODER?: TextEncoder;
    private static TEXT_DECODER?: TextDecoder;

    public buffer: Uint8Array;
    public offset: number;

    constructor(buffer: Uint8Array) {
        this.buffer = buffer;
        this.offset =  0;
    }

    // Lazy init
    private get textEncoder() {
        if (!PacketBuffer.TEXT_ENCODER) PacketBuffer.TEXT_ENCODER = new TextEncoder();
        return PacketBuffer.TEXT_ENCODER;
    }

    // Lazy init
    private get textDecoder() {
        if (!PacketBuffer.TEXT_DECODER) PacketBuffer.TEXT_DECODER = new TextDecoder();
        return PacketBuffer.TEXT_DECODER;
    }

    private ensureCapacity(length: number) {
        if (this.buffer.length < this.offset + length) this.extend(length);
    }

    private extend(length: number) {
        const newBuffer = new Uint8Array(this.buffer.length + length);
        newBuffer.set(this.buffer);
        this.buffer = newBuffer;
    }

    public readUint8(): number {
        const value = this.buffer[this.offset];
        this.offset += 1;
        return value;
    }

    public writeUint8(value: number) {
        this.ensureCapacity(1);
        this.buffer[this.offset] = value;
        this.offset += 1;
    }

    public readUint32(): number {
        const value = this.buffer.slice(this.offset, this.offset + 4)
            .reduce((acc, byte, index) => acc + byte * (256 ** (3 - index)), 0)
        this.offset += 4;
        return value;
    }

    public writeUint32(value: number) {
        if (value < 0 || value > 0xFFFFFFFF) throw new Error("Value must be between 0 and 0xFFFFFFFF");

        this.ensureCapacity(4);
        this.buffer.set([
            (value >> 24) & 0xFF,
            (value >> 16) & 0xFF,
            (value >> 8) & 0xFF,
            value & 0xFF,
        ], this.offset);
        this.offset += 4;
    }

    public readInt32(): number {
        const value = this.readUint32();
        return value >= 0x80000000 ? value - 0x100000000 : value; // Sign extension
    }

    public writeInt32(value: number) {
        if (value < -Number.MAX_SAFE_INTEGER || value > Number.MAX_SAFE_INTEGER) throw new Error("Value must be between -2^31 and 2^31-1");
        this.writeUint32(value >>> 0); // Only the read method is different
    }

    public readString(): string {
        const length = this.readUint32();
        const bytes = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return this.textDecoder.decode(bytes);
    }

    public writeString(value: string) {
        const bytes = this.textEncoder.encode(value);
        const length = bytes.length;

        this.writeUint32(bytes.length); // Length cannot be negative
        this.ensureCapacity(length)
        this.buffer.set(bytes, this.offset);
        this.offset += bytes.length;
    }
}