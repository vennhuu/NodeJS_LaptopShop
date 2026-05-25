import { prisma } from "./client";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "phuoc@gmail.com",
          password: "123356",
          accountType: "SYSTEM",
        },
        {
          username: "admin@gmail.com",
          password: "123356",
          accountType: "SYSTEM",
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
