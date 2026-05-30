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
  return res.render("client/home/show.ejs");
};

export { getHomePage };
