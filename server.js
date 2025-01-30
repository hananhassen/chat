const express=require("express");
const http=require("http");
const path = require("path");
const socket=require("socket.io");
const app=express();
const server=http.createServer(app);
const io=socket(server);
// const createAdapter = require("@socket.io/redis-adapter").createAdapter;

// const redis = require("redis");
// require("dotenv").config();
// const { createClient } = redis;
const messagetext=require('./public/materials/message');
const {joinChat,getcurentuser, userleave,
    getuserroom}=require('./public/materials/user');
// app.get("/",(req,res)=>{
//     res.send("hello socket io");
// });
// app.use(express.urlencoded({
//     extended:true
// }))
// app.post('/insertvalue',(req,res)=>{
//     let username=req.body.name;
//     let group=req.body.group;
// console.log(username);
// console.log(group);

// })
console.log(messagetext);
app.use(express.static(path.join(__dirname,'public')));
console.log(io);
let appname=`let's chat`

io.on("connection",socket=>{
    socket.on('join',({username,group})=>{
        console.log(username,group);
const user=joinChat(socket.id,username,group);
socket.join(user.group)
        socket.emit("message",messagetext(appname,"wellcome to the group"));
        socket.broadcast.to(user.group).emit('message',messagetext(appname,`'${user.username}' has joined the chat`));
//send user and group info
io.to(user.group).emit('groupusers',{group:user.group,
    users:getuserroom(user.group)
} );

    });
    socket.on('chathing',(mainMsg)=>{
        const user=getcurentuser(socket.id);
      if(mainMsg!=='') {io.to(user.group).emit("message",messagetext(user.username,mainMsg));}
  
        
    })
    console.log("new connection");
   
    socket.on('disconnect',()=>{
        const user=userleave(socket.id);
        if(user){
            io.to(user.group).emit('message',messagetext(appname,`'${user.username}' has left the group`))

            io.to(user.group).emit('groupusers',{group:user.group,
                users:getuserroom(user.group)
            } );
        }

    })
  
 });
                                                   




server.listen(4000,()=>{
    console.log("my port is runing on port 4000")
});