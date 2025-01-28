import { WebSocket, WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'

const wss = new WebSocketServer({ port: 8080 });

interface User{
  userId: string,
  rooms: string[],
  ws: WebSocket
}

let users: User[] = []

function checkUser(token:string){
  try {
    const decoded = jwt.verify(token, 'drawsome123#@')

    if(typeof decoded === 'string' || !decoded || !decoded.id){
      return null
    }

    const userId = decoded.id 

    return userId
  } catch (error) {

    if (error instanceof Error) {
      console.error("Error while token decode proccess :", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return null
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request?.url
  const urlSearchParam = new URLSearchParams(url?.split('?')[1])
  const token = urlSearchParam.get('token') || ""

  const userId =  checkUser(token)

  if(!userId){
    ws.close()
    return null
  }

  users.push({
    userId,
    rooms : [],
    ws
  })

  ws.on("message", async function message(data){
    let parsedData;

    if(typeof data == 'string'){
      parsedData = JSON.parse(data)
    } else {
      parsedData = JSON.parse(data.toString())
    }

    console.log('parsedData ::=>', parsedData)

    if(parsedData.type === 'join_room'){
      const user = users.find(x => x.ws === ws)
      user?.rooms.push(parsedData.room)
    }

    if(parsedData.type === 'leave_room'){
     const user = users.find(x => x.ws === ws)
     if(!user){
      return null
     }
     user.rooms = user?.rooms.filter(x => x === parsedData.room)
    }

    if (parsedData.type == "chat") {
      users.forEach((user) => {
        if (user.rooms.includes(parsedData.room)) {
          user.ws.send(JSON.stringify({
            message : parsedData.message,
            type : 'chat',
            room: parsedData.room
          }));
        }
      });
    }

  });
  
});
