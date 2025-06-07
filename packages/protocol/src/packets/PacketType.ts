export enum PacketType {
    // Heartbeat
    Hello, // Used to send the heartbeat interval
    Ping,
    Pong,

    // Login
    Login,
    Ready,

    // User List
    UserInfoUpdate,
    UserInfoRemove,

    // Chat
    ChatMessage, // C2S
    ChatBroadcast, // S2C
}