import z from "zod";

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, "email" | "password">;
