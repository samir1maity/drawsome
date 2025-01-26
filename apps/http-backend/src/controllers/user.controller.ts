import { Request, Response } from "express";
import { userSigninSchema } from '@rep/common/types'
import { prisma } from "@repo/db/client";
import * as bcrypt from "bcrypt";

export async function signup(req: Request, res: Response) {
  try {
    const data = userSigninSchema.safeParse(req.body);
    console.log("data", data.error);
    if (!data.success) {
      res.status(400).json({
        status: 400,
        is_error: true,
        message: "bad inputs",
      });
      return
    }
    const { email, password } = req.body;

    const isExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isExist) {
      res.status(409).json({
        is_error: true,
        message: "user is already exist",
      });
      return
    }

    console.log("isExist user", isExist);

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashedPassword", hashedPassword);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      is_error: false,
      success: true,
      message: "successfully signed up",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while signup proccess :", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    res.status(500).json({
      is_error: true,
      message: "Internal server error",
      success: false,
    });
  }
}

export function login(req: Request, res: Response) {
  const { email, password } = req.body;

  //

  res.status(200).json({
    is_error: false,
    success: true,
    message: "you reache to the signup route",
  });
}
