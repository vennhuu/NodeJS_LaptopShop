import { Request, Response } from "express";
import { RegisterNewUser } from "service/auth/auth.service";
import {
  RegisterSchema,
  TRegisterSchema,
} from "src/validation/register.schema";

const getRegisterPage = async (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return res.render("auth/register", {
    errors: errors,
    oldData: oldData,
  });
};

const postRegisterPage = async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } =
    req.body as TRegisterSchema;

  const validate = await RegisterSchema.safeParseAsync(req.body);

  if (!validate.success) {
    // errors
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map((item) => item.message);
    const oldData = { fullName, email, password, confirmPassword };

    return res.render("auth/register", {
      errors: errors,
      oldData: oldData,
    });
  }

  // success
  await RegisterNewUser(fullName, email, password);

  return res.redirect("/login");
};

export { getRegisterPage, postRegisterPage };
