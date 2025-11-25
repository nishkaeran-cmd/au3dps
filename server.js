// server.js
const WebSocket = require("ws");
const PORT = process.env.PORT || 3000;

// Create WebSocket server
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      // Handle handshake
      if (data.cmd === "handshake") {
        console.log("Handshake received:", data);

        // CloudLink requires echoing back the listener field
        const reply = {
          cmd: "handshake",
          val: { ok: true },
          listener: data.listener
        };

        ws.send(JSON.stringify(reply));
        console.log("Handshake reply sent:", reply);
      }

      // Add other command handlers here if needed
    } catch (err) {
      console.error("Invalid message:", msg);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
