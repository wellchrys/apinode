const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());

io.on("connection", socket => {
    socket.on("connectRoom", box => {
        socket.join(box);
    });
});

mongoose.connect('mongodb+srv://wellchrys:root1234@cluster0-bfnfa.mongodb.net/api?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require("./routes"));

server.listen(process.env.PORT || 3333);