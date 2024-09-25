const { spawn } = require('child_process');
const path = require('path');

// Đường dẫn đến peerServer.js
const peerServerPath = path.join(__dirname, 'public', 'js', 'peerServer.js');

// Chạy peerServer
const peerServer = spawn('node', [peerServerPath]);

peerServer.stdout.on('data', (data) => {
    console.log(`PeerServer: ${data}`);
});

peerServer.stderr.on('data', (data) => {
    console.error(`PeerServer Error: ${data}`);
});

// Chạy server chính
const mainServerPath = path.join(__dirname, 'server.js');
const mainServer = spawn('node', [mainServerPath]);

mainServer.stdout.on('data', (data) => {
    console.log(`MainServer: ${data}`);
});

mainServer.stderr.on('data', (data) => {
    console.error(`MainServer Error: ${data}`);
});