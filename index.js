const express = require("express");
const app = express();
const http = require("http");

const expressServer = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(expressServer);

io.on("connection", (socket) => {
    socket.join("kitchen-room");

    // getting size of kitchen you have to access it like this
    let sizeOfKitchen = io.sockets.adapter.rooms.get("kitchen-room").size;

    // Kitchen Room
    io.sockets
        .in("kitchen-room")
        .emit("cooking", "Fried Rice Cooking = " + sizeOfKitchen);
    io.sockets.in("kitchen-room").emit("boiling", "Boiling water");

    // Bedroom
    socket.join("bed-room");
    io.sockets.in("bed-room").emit("sleeping", "I am sleeping");
    io.sockets.in("bed-room").emit("resting", "I am resting");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, function () {
    console.log("Server running on port: 3000");
});
