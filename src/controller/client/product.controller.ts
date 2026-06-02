import { Request, Response } from "express";
import { getDetailProduct } from "service/product.service";

const getDetailProductPage = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await getDetailProduct(id);
  return res.render("client/product/detail.ejs", {
    product: product,
  });
};
export { getDetailProductPage };
