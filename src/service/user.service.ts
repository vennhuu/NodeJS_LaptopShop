import getConnection from "config/db";
import { PrismaClient } from "@prisma/client";
import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (plaintText: string) => {
  return await bcrypt.hash(plaintText, saltRounds);
};

const comparePassword = async (plaintText: string, hashPassword: string) => {
  return await bcrypt.compare(plaintText, hashPassword);
};

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string,
  phone: string,
  avatar: string,
  role: string,
) => {
  const defaultPassword = await hashPassword("123456");
  // insert into database
  const newUser = await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: defaultPassword,
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
      roleId: +role,
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
  phone: string,
  address: string,
  avatar: string,
  role: string,
) => {
  const updateUser = await prisma.user.update({
    where: { id: +id },
    data: {
      fullName: fullName,
      username: email,
      address: address,
      accountType: ACCOUNT_TYPE.SYSTEM,
      ...(avatar !== undefined && { avatar: avatar }),
      phone: phone,
      roleId: +role,
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
  hashPassword,
  comparePassword,
};
