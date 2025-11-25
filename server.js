// server.js
const WebSocket = require("ws");
const PORT = process.env.PORT || 3000;

// Create WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Listen for messages
  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      // Handle handshake
      if (data.cmd === "handshake") {
        console.log("Handshake received:", data);
        ws.send(
          JSON.stringify({
            cmd: "handshake",
            val: { ok: true },
          })
        );
      }

      // You can add other command handlers here
      // e.g. if (data.cmd === "ping") { ... }
    } catch (err) {
      console.error("Invalid message:", msg);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
