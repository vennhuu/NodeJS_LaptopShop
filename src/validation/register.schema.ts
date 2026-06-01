import { isEmailExist } from "service/auth/auth.service";
import { z } from "zod";

const passwordSchema = z
  .string()
  .trim()
  .min(3, "Mật khẩu không được ít hơn 3 kí tự")
  .max(20, "Mật khẩu tối đa là 20 kí tự");

const emailSchema = z
  .string()
  .email("Email không đúng định dạng")
  .refine(
    async (email) => {
      const existEmail = await isEmailExist(email);
      return !existEmail;
    },
    {
      message: "Email đã tồn tại",
      path: ["email"],
    },
  );

export const RegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, { message: "Tên không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password không chính xác",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
