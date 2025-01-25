import { Request, Response } from "express";

export function login(req: Request, res: Response) {

  const { email, password } = req.body

  // write logic
  // db connection

  res.status(200).json({
    is_error:false,
    success:true,
    data:'token',
    message: 'you reache to the signin route'
  })

}

export function signup(req: Request, res: Response) {

    const { email, password } = req.body

    //

    res.status(200).json({
        is_error:false,
        success:true,
        message: 'you reache to the signup route'
    })
}
