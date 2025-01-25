import { Request, Response } from "express";
import { userSigninSchema } from "@repo/common/types";

export function login(req: Request, res: Response) {
  const data = userSigninSchema.safeParse(req.body);

  if (!data.success) {
    res.status(400).json({
      status: 400,
      is_error: true,
      message: "bad inputs",
    });
  }

  const { email, password } = req.body;

  // write logic
  // db connection

  res.status(200).json({
    is_error: false,
    success: true,
    data: "token",
    message: "you reache to the signin route",
  });
}

export function signup(req: Request, res: Response) {
  const { email, password } = req.body;

  //

  res.status(200).json({
    is_error: false,
    success: true,
    message: "you reache to the signup route",
  });
}
