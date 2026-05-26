import { hashPassword } from "service/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  if (countUser === 0) {
    const defaultPassword = await hashPassword("123456");

    await prisma.user.createMany({
      data: [
        {
          fullName: "Phuoc",
          username: "phuoc@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
        },
        {
          fullName: "Admin",
          username: "admin@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
        },
      ],
    });
  } else {
    console.log("Already init data");
  }

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
};

export default initDatabase;
