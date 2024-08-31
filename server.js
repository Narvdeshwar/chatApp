
const io = require("socket.io")(8000,{
    cors:"*"
})
var users = {}
io.on("connection",(socket)=>{
    socket.on("user-joined",(name)=>{
        socket.broadcast.emit("join",name)
        users[socket.id]=name
    })
    socket.on("send",(message)=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    })
    socket.on("disconnect",(name)=>{
        socket.broadcast.emit("left",users[socket.id])
        delete users[socket.id]
    })
})