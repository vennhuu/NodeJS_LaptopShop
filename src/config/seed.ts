import { hashPassword } from "service/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
  const countRole = await prisma.role.count();
  if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Admin full quyen",
        },
        {
          name: "USER",
          description: "Chi co chuc nang user",
        },
      ],
    });
  } else {
    console.log("Already init data");
  }

  const countUser = await prisma.user.count();
  if (countUser === 0) {
    const defaultPassword = await hashPassword("123456");
    const roleAdmin = await prisma.role.findFirst({
      where: { name: "ADMIN" },
    });
    if (roleAdmin) {
      await prisma.user.createMany({
        data: [
          {
            fullName: "Phuoc",
            username: "phuoc@gmail.com",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: roleAdmin.id,
          },
          {
            fullName: "Admin",
            username: "admin@gmail.com",
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: roleAdmin.id,
          },
        ],
      });
    }
  } else {
    console.log("Already init data");
  }
};

export default initDatabase;
