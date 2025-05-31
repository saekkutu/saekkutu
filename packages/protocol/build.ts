import protobuf from "protobufjs";

let protocol = protobuf.loadSync("main.proto");
let json = protocol.toJSON();

Bun.write("src/protocol.json", JSON.stringify(json));