import getConnection from "config/db";
import { PrismaClient } from "@prisma/client";
import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string,
  phone: string,
  avatar: string,
) => {
  // insert into database
  const newUser = await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: "123456",
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
    },
  });
  return newUser;
};

const getAllUsers = async () => {
  const listUsers = await prisma.user.findMany();
  return listUsers;
};

const handleDeleteUser = async (id: string) => {
  const deleteUser = await prisma.user.delete({ where: { id: +id } });
  return deleteUser;
};

const handleViewUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id: +id } });
  return user;
};

const updateUserById = async (
  id: string,
  fullName: string,
  email: string,
  address: string,
) => {
  const updateUser = await prisma.user.update({
    where: { id: +id },
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: "",
      accountType: "",
    },
  });
  return updateUser;
};

const getAllRoles = async () => {
  const listRoles = await prisma.role.findMany();
  return listRoles;
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  handleViewUser,
  updateUserById,
  getAllRoles,
};
