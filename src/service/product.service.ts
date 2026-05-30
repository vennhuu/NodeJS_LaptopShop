import { prisma } from "config/client";

const getDetailProduct = async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id: +id } });
  return product;
};

export { getDetailProduct };
