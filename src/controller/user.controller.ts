import { Request, Response } from "express";
import { getAllUsers, handleCreateUser } from "service/user.service";

const getHomePage = async (req: Request, res: Response) => {
  // get users
  const users = await getAllUsers();
  console.log("Check Users", users);
  return res.render("home", {
    users: users,
  });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user");
};

const postCreateUser = async (req: Request, res: Response) => {
  console.log("Request User: ", req.body);
  const { fullName, email, address } = req.body;

  // handle create user
  await handleCreateUser(fullName, email, address);

  return res.redirect("/");
};

export { getHomePage, getCreateUserPage, postCreateUser };
