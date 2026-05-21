import { Request, Response } from "express";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleViewUser,
  updateUserById,
} from "service/user.service";

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
  const { fullName, email, address } = req.body;

  // handle create user
  await handleCreateUser(fullName, email, address);

  return res.redirect("/");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await handleDeleteUser(id);
  return res.redirect("/");
};

const getViewUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await handleViewUser(id);

  console.log(user);
  return res.render("view-user.ejs", {
    user: user,
  });
};

const getUpdateUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await handleViewUser(id);

  console.log(user);
  return res.render("update-user.ejs", {
    user: user,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, email, address } = req.body;
  await updateUserById(id, fullName, email, address);

  return res.redirect("/");
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
  getUpdateUser,
};
