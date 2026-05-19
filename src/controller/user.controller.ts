import { Request, Response } from "express";
import { handleCreateUser } from "../service/user.service";

const getHomePage = (req: Request, res: Response) => {
  return res.render("home");
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user");
};

const postCreateUser = (req: Request, res: Response) => {
  console.log("Request User: ", req.body);
  const { fullName, email, address } = req.body;

  // handle create user
  handleCreateUser(fullName, email, address);

  return res.redirect("/");
};

export { getHomePage, getCreateUserPage, postCreateUser };
