import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Name can not be null" }),
  price: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, { message: "Số tiền tối thiểu là 1" }),
  detailDesc: z
    .string()
    .trim()
    .min(1, { message: "Detail Description can not be null" }),
  shortDesc: z
    .string()
    .trim()
    .min(1, { message: "Short Description can not be null" }),
  quantity: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, { message: "Số lượng tối thiểu là 1" }),
  factory: z.string().trim().min(1, { message: "Factory can not be null" }),
  target: z.string().trim().min(1, { message: "Target can not be null" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
