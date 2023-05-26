const express = require("express");
const app = express();
const http = require("http");

const expressServer = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(expressServer);

io.on("connection", (socket) => {
    console.log("New User Connection");

    socket.on("chat", (data) => {
        // This io.emit will broadcast
        io.emit("chat_send", data);
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, function () {
    console.log("Server running on port: 3000");
});
