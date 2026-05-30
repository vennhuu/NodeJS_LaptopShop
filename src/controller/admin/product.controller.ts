import { Request, Response } from "express";
import {
  createNewProduct,
  getDetailProduct,
  handleDeleteProduct,
  updateProductById,
} from "service/product.service";

const getCreateProduct = async (req: Request, res: Response) => {
  return res.render("admin/product/create-product");
};

const postCreateProduct = async (req: Request, res: Response) => {
  const {
    name,
    price,
    image,
    detailDesc,
    shortDesc,
    quantity,
    factory,
    target,
  } = req.body;

  const file = req.file;
  const avatar = file?.filename ?? undefined;

  await createNewProduct(
    name,
    price,
    avatar,
    detailDesc,
    shortDesc,
    quantity,
    factory,
    target,
  );
  return res.redirect("admin/product");
};

const getViewProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const product = await getDetailProduct(id);
  return res.render("admin/product/view-product.ejs", {
    product: product,
  });
};

const getUpdateProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const product = await getDetailProduct(id);
  return res.render("admin/product/update-product.ejs", {
    product: product,
  });
};

const postUpdateProduct = async (req: Request, res: Response) => {
  const {
    id,
    name,
    price,
    image,
    detailDesc,
    shortDesc,
    quantity,
    factory,
    target,
  } = req.body;

  const file = req.file;
  const avatar = file?.filename ?? undefined;

  await updateProductById(
    id,
    name,
    price,
    avatar,
    detailDesc,
    shortDesc,
    quantity,
    factory,
    target,
  );

  return res.redirect("/admin/product");
};

const postDeleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  await handleDeleteProduct(id);
  return res.redirect("/admin/product");
};

export {
  getCreateProduct,
  postCreateProduct,
  getViewProduct,
  getUpdateProduct,
  postUpdateProduct,
  postDeleteProduct,
};
