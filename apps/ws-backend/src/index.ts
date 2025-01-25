import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {

    // google what can we get from request object

    // then from url take the query param

    // using this user token findout user name


    //
  ws.on("message", () => {
    ws.send("hello!");
  });
});
