import { NextFunction, Request, Response } from "express";

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

const postLogout = async (req: Request, res: Response, next: NextFunction) => {
  req.logout((err: any) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { getLoginPage, getSuccessRedirectPage, postLogout };
