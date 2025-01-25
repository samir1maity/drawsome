import express from "express";
import userRouter from "./routes/user.route";

const app = express();

app.get("/", (req, res) => {
  res.send("you are tunned");
  console.log('reached')
});

app.use("/api/v1/user", userRouter);

app.listen(3004);
