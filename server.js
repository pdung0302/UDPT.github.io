/////////////////////   Server

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
const path = require('path'); 
const fs = require("fs");
const { title } = require('process');


app.use(express.static(path.join(__dirname, "/public"))); 
app.use("/data", express.static(__dirname + "/data"));


app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 


app.get('/', function(req, res){
    res.render('index.ejs', {quizzes});
});

const quizFile = fs.readdirSync("./data").filter((name) => name.endsWith(".js"));

const quizzes = [];

for(const file of quizFile) {
    const quizFiles = require(`./data/${file}`);
    quizzes.push({
      title: quizFiles.quizData.title,
      slug: file.replace(".js", "")
    });
}

app.get("/quiz", (req, res) => {
    res.render("quiz.ejs", {query: req.query.name});
});



server.listen(3001, () => {
    console.log("Server running...");
});

const arrUserInfo = [];

io.on('connection', (socket) => {
    // console.log("User connected: " + socket.id);
  
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  
      socket.on('NGUOI_DUNG_DANG_KY', user => {
        const isExist = arrUserInfo.some(e => e.name === user.name);
        
        socket.peerId = user.peerId;
  
        if(isExist) {
          return socket.emit('DANG_KY_THAT_BAI');
        }
  
        arrUserInfo.push(user);
        socket.emit('DANH_SACH_ONLINE', arrUserInfo);
        socket.broadcast.emit('CO_NGUOI_DUNG_MOI', user);
      });
  
      socket.on('disconnect', () => {
          const index = arrUserInfo.findIndex(user => user.peerId === socket.peerId);
          arrUserInfo.splice(index, 1);
          io.emit('USER_DISCONNECTED', socket.peerId);
      });
  });