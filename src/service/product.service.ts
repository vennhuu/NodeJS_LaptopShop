import { prisma } from "config/client";

const getDetailProduct = async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id: +id } });
  return product;
};

const getAllProduct = async () => {
  const listProduct = await prisma.product.findMany();
  return listProduct;
};

const createNewProduct = async (
  name: string,
  price: string,
  image: string,
  detailDesc: string,
  shortDesc: string,
  quantity: string,
  factory: string,
  target: string,
) => {
  const newProduct = await prisma.product.create({
    data: {
      name: name,
      price: +price,
      image: image,
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      quantity: +quantity,
      sold: "0",
      factory: factory,
      target: target,
    },
  });
  return newProduct;
};

const updateProductById = async (
  id: string,
  name: string,
  price: string,
  image: string,
  detailDesc: string,
  shortDesc: string,
  quantity: string,
  factory: string,
  target: string,
) => {
  const updateProduct = await prisma.product.update({
    where: { id: +id },
    data: {
      name: name,
      price: +price,
      ...(image !== undefined && { image: image }),
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      quantity: +quantity,
      sold: "0",
      factory: factory,
      target: target,
    },
  });
  return updateProduct;
};

const handleDeleteProduct = async (id: string) => {
  const product = await prisma.product.delete({ where: { id: +id } });
  return product;
};
export {
  getDetailProduct,
  getAllProduct,
  createNewProduct,
  updateProductById,
  handleDeleteProduct,
};
