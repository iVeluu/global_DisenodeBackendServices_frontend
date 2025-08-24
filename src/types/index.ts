import z from "zod";

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string()
})

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
})

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "email" | "password" | "name" | "password_confirmation"
>;

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Omit<Task, '_id'>;
