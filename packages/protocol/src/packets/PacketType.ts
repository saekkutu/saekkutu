export enum PacketType {
    // Heartbeat
    Hello, // Used to send the heartbeat interval
    Ping,
    Pong,

    // Auth
    Login,
    Ready,

    // User
    UserInfoUpdate,
    UserInfoRemove,

    // Chat
    ChatMessage, // C2S
    ChatBroadcast, // S2C

    // Room
    RoomCreate,
    // RoomJoin,
    // RoomLeave,
    RoomInfoUpdate,
    RoomInfoRemove,
}