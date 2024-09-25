const { spawn } = require('child_process');
const path = require('path');

// Chạy peerServer
const peerServer = spawn('node', [path.join(__dirname, 'public', 'js', 'peerServer.js')]);

peerServer.stdout.on('data', (data) => {
    console.log(`PeerServer: ${data}`);
});

peerServer.stderr.on('data', (data) => {
    console.error(`PeerServer Error: ${data}`);
});

// Chạy server chính
const mainServer = spawn('node', [path.join(__dirname, 'server.js')]);

mainServer.stdout.on('data', (data) => {
    console.log(`MainServer: ${data}`);
});

mainServer.stderr.on('data', (data) => {
    console.error(`MainServer Error: ${data}`);
});