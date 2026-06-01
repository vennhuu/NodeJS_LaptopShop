import { prisma } from "config/client";
import bcrypt from "bcrypt";
import { ACCOUNT_TYPE } from "config/constant";

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { username: email } });

  if (user) {
    return true;
  }
  return false;
};

const saltRounds = 10;

const hashPassword = async (plaintText: string) => {
  return await bcrypt.hash(plaintText, saltRounds);
};

const RegisterNewUser = async (
  fullName: string,
  email: string,
  password: string,
) => {
  const passwordUser = await hashPassword(password);

  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  const newUser = await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      password: passwordUser,
      accountType: ACCOUNT_TYPE.SYSTEM,
      roleId: userRole.id,
    },
  });
  return newUser;
};

export { isEmailExist, RegisterNewUser };
