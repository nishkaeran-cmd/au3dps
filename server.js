// server.js
const WebSocket = require("ws");
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.cmd === "handshake") {
        console.log("Handshake received:", data);
        ws.send(JSON.stringify({
          cmd: "handshake",
          val: { ok: true }
        }));
      }
    } catch (err) {
      console.error("Invalid message:", msg);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
