import { Request, Response } from "express";
import { getProduct } from "service/client/item.service";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleViewUser,
  updateUserById,
} from "service/user.service";

const getHomePage = async (req: Request, res: Response) => {
  // get products
  const products = await getProduct();
  return res.render("client/home/show.ejs", {
    products: products,
  });
};

export { getHomePage };
