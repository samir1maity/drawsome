import { z } from "zod";

export const userSigninSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z.string().min(5),
});
