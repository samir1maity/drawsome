import { Request, Response } from "express";
import { userSigninSchema } from "@rep/common/types";
import { prisma } from "@repo/db/client";
import * as bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  try {
    const data = userSigninSchema.safeParse(req.body);
    if (!data.success) {
      res.status(400).json({
        status: 400,
        is_error: true,
        message: "bad inputs",
      });
      return;
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
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      is_error: false,
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
    });
  }
}

export async function login(req: Request, res: Response) {
  const data = userSigninSchema.safeParse(req.body);

  if (!data.success) {
    res.status(400).json({
      status: 400,
      is_error: true,
      message: "bad inputs",
    });
    return
  }

  const { email, password } = req.body;

  const isUser = await prisma.user.findFirst({
    where : {
      email
    }
  })

  if(!isUser){
    res.status(409).json({
      is_error: true,
      message: "user is not exist",
    });
    return
  }

  const isCorrectPassword = await bcrypt.compare(password, isUser.password) 

  console.log('isCorrectPassword', isCorrectPassword)

  if(!isCorrectPassword){
    res.status(403).json({
      message: 'wrong password',
      is_error: true
    })
    return
  }

  const token = jwt.sign({id: isUser.id, email: isUser.email}, 'drawsome123#@')

  res.status(200).json({
    is_error: false,
    token: token,
    message: "successfully signed in",
  });
}
