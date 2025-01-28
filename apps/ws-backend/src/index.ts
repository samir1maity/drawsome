import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'

const wss = new WebSocketServer({ port: 8080 });

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

  ws.on("message", () => {
    ws.send("hello!");
  });
});
