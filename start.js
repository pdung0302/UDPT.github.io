const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Đường dẫn đến peerServer.js
const peerServerPath = path.join(__dirname, 'public', 'js', 'peerServer.js');

// Kiểm tra nếu peerServer.js tồn tại
if (fs.existsSync(peerServerPath)) {
    // Chạy peerServer
    const peerServer = spawn('node', [peerServerPath]);

    peerServer.stdout.on('data', (data) => {
        console.log(`PeerServer: ${data}`);
    });

    peerServer.stderr.on('data', (data) => {
        console.error(`PeerServer Error: ${data}`);
    });

    peerServer.on('close', (code) => {
        console.log(`PeerServer đã thoát với mã: ${code}`);
    });

} else {
    console.error(`Không tìm thấy file: ${peerServerPath}`);
}

// Đường dẫn đến server.js
const mainServerPath = path.join(__dirname, 'server.js');

// Kiểm tra nếu server.js tồn tại
if (fs.existsSync(mainServerPath)) {
    // Chạy server chính
    const mainServer = spawn('node', [mainServerPath]);

    mainServer.stdout.on('data', (data) => {
        console.log(`MainServer: ${data}`);
    });

    mainServer.stderr.on('data', (data) => {
        console.error(`MainServer Error: ${data}`);
    });

    mainServer.on('close', (code) => {
        console.log(`MainServer đã thoát với mã: ${code}`);
    });

} else {
    console.error(`Không tìm thấy file: ${mainServerPath}`);
}
