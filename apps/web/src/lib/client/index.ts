import protocol from "@saekkutu/protocol";
import protobuf from "protobufjs/light";

let protocolRoot = protobuf.Root.fromJSON(protocol);

export default class Client {
    private ws: WebSocket;

    constructor() {
        this.ws = new WebSocket("ws://localhost:8080");
    }

    public connect() {
        this.ws.onopen = () => {
            console.log("Handshaking...");
            let handshake = protocolRoot.lookupType("protocol.Handshake");
            let handshakeMessage = handshake.create({
                name: "test"
            });
            this.ws.send(handshake.encode(handshakeMessage).finish());
        }
    }
}