import { Request, Response } from "express";

const getLoginPage = async (req: Request, res: Response) => {
  const { session } = req as any;
  const messages = session?.messages ?? [];
  return res.render("auth/login", {
    messages: messages,
  });
};

const getSuccessRedirectPage = async (req: Request, res: Response) => {
  const user = req.user as any;

  if (user?.role?.name === "ADMIN") {
    return res.redirect("/admin");
  } else {
    return res.redirect("/");
  }
};

export { getLoginPage, getSuccessRedirectPage };
