export enum PacketType {
    // Heartbeat
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