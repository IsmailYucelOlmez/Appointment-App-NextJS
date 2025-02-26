import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginSchema = z.infer<typeof schema>;

const registerSchema = z.object({
  name:z.string().min(2),
  email: z.string().email(),
  password: z.string().min(1),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export { schema, type LoginSchema, registerSchema, type RegisterSchema };