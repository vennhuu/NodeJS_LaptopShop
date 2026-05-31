import { Request, Response } from "express";
import {
  createNewProduct,
  getDetailProduct,
  handleDeleteProduct,
  updateProductById,
} from "service/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getCreateProduct = async (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    name: "",
    price: "",
    detailDesc: "",
    shortDesc: "",
    quantity: "",
    factory: "",
    target: "",
  };
  return res.render("admin/product/create-product", {
    errors: errors,
    oldData: oldData,
  });
};

const postCreateProduct = async (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } =
    req.body as TProductSchema;

  const validate = ProductSchema.safeParse(req.body);

  if (!validate.success) {
    // error
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]?.toString()})`,
    );
    const oldData = {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
    };
    return res.render("admin/product/create-product", {
      errors: errors,
      oldData: oldData,
    });
  }

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
