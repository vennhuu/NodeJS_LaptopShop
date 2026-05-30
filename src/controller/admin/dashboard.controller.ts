import { Request, Response } from "express";
import { getAllProduct } from "service/product.service";
import {
  getAllRoles,
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleViewUser,
  updateUserById,
} from "service/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/dashboard");
};

const getUsersPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("admin/user/user", {
    users: users,
  });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create-user", {
    roles: roles,
  });
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;

  const file = req.file;
  const avatar = file?.filename ?? undefined;
  // handle create user
  await handleCreateUser(fullName, username, address, phone, avatar, role);

  return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await handleViewUser(id);
  const roles = await getAllRoles();

  return res.render("admin/user/view-user.ejs", {
    user: user,
    roles: roles,
  });
};

const getUpdateUser = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await handleViewUser(id);
  const roles = await getAllRoles();

  return res.render("admin/user/update-user.ejs", {
    user: user,
    roles: roles,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, username, phone, role, address } = req.body;

  const file = req.file;
  const avatar = file?.filename ?? undefined;

  await updateUserById(id, fullName, username, phone, address, avatar, role);

  return res.redirect("/admin/user");
};

const getOrdersPage = async (req: Request, res: Response) => {
  return res.render("admin/order/order");
};

const getProductsPage = async (req: Request, res: Response) => {
  const product = await getAllProduct();
  return res.render("admin/product/product", {
    product: product,
  });
};

export {
  getDashboardPage,
  getUsersPage,
  getOrdersPage,
  getProductsPage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  getUpdateUser,
  postUpdateUser,
};
