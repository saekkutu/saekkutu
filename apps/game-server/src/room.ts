export class Room {
    public readonly id: number;
    public readonly title: string;
    public readonly creator: number;
    public users: number[] = [];

    constructor(id: number, title: string, creator: number) {
        this.id = id;
        this.title = title;
        this.creator = creator;
        this.users = [];
    }
}