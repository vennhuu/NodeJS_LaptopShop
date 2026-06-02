import { Request, Response } from "express";
import { getProduct } from "service/client/item.service";

const getHomePage = async (req: Request, res: Response) => {
  // get products
  const products = await getProduct();
  const user = req.user;

  console.log("CHECK USER", user);
  return res.render("client/home/show.ejs", {
    products: products,
  });
};

export { getHomePage };
