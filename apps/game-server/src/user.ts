export class User {
    public readonly id: number;
    public name: string;
    public roomId?: number;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.roomId = undefined;
    }
}