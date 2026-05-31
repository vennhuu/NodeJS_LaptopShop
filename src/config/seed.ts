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

  const countProduct = await prisma.product.count();
  if (countProduct === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: "Asus TUF Gaming F15 FX506HF HN014W",
          price: 17990000,
          detailDesc:
            "Laptop gaming giá rẻ nhưng vẫn mạnh mẽ, dùng chip Intel thế hệ 11 và card rời RTX 2050 cho trải nghiệm mượt mà.",
          shortDesc: "Laptop gaming giá rẻ nhưng mạnh mẽ.",
          quantity: 100,
          factory: "ASUS",
          target: "GAMING",
          image: "1711078922373-asus-01.png",
        },
        {
          name: "Laptop Dell Inspiron 15 3520",
          price: 15900000,
          detailDesc:
            "Laptop cấu hình ổn định, phù hợp học tập, làm việc với chip Intel Gen 12.",
          shortDesc: "Dành cho dân văn phòng.",
          quantity: 150,
          factory: "DELL",
          target: "SINHVIEN-VANPHONG",
          image: "1711078932165-dell-01.png",
        },
        {
          name: "Lenovo IdeaPad Gaming 3",
          price: 19500000,
          detailDesc:
            "Cấu hình mạnh, card GTX 1650, phù hợp cho sinh viên yêu thích game.",
          shortDesc: "Sinh viên, chơi game nhẹ",
          quantity: 150,
          factory: "LENOVO",
          target: "GAMING",
          image: "1711082364791-lenovo.png",
        },
        {
          name: "MacBook Air M1 2020",
          price: 23990000,
          detailDesc:
            "MacBook hiệu năng mạnh mẽ, pin lâu, màn đẹp, chạy chip M1.",
          shortDesc: "Phù hợp học tập, văn phòng.",
          quantity: 90,
          factory: "APPLE",
          target: "THIET-KE-DO-HOA",
          image: "1711082738841-apple-01.png",
        },
        {
          name: "Laptop LG Gram Style",
          price: 31949000,
          detailDesc: "Laptop siêu nhẹ, màn OLED, pin lâu, phù hợp doanh nhân.",
          shortDesc: "Văn phòng cao cấp.",
          quantity: 99,
          factory: "LG",
          target: "SINHVIEN-VANPHONG",
          image: "1711080778179-apple-02.png",
        },
        {
          name: "MacBook Air M2 2022",
          price: 29999000,
          detailDesc:
            "Phiên bản nâng cấp chip M2, hiệu năng mạnh mẽ, cực kỳ tiết kiệm pin.",
          shortDesc: "Macbook cho học tập.",
          quantity: 99,
          factory: "APPLE",
          target: "DOANH-NHAN",
          image: "1711080824771-apple-03.png",
        },
        {
          name: "Acer Nitro 17",
          price: 28999000,
          detailDesc:
            "Trang bị RTX 4060, Core i7 Gen 13, chơi game AAA mượt mà.",
          shortDesc: "Máy mạnh chơi game nặng.",
          quantity: 110,
          factory: "ACER",
          target: "GAMING",
          image: "1711080928477-acer.png",
        },
        {
          name: "Acer Ultralight AN515",
          price: 19200000,
          detailDesc:
            "Máy nhẹ, bền, cấu hình ổn, card rời RTX 3050, phù hợp sinh viên.",
          shortDesc: "Cả game nhẹ và văn phòng.",
          quantity: 80,
          factory: "ACER",
          target: "SINHVIEN-VANPHONG",
          image: "1711080976371-acer-02.png",
        },
        {
          name: "Laptop ACER 15s",
          price: 15900000,
          detailDesc: "Màn FHD, 120Hz, hiệu năng tốt cho học sinh, sinh viên.",
          shortDesc: "Dành cho sinh viên",
          quantity: 120,
          factory: "ACER",
          target: "MONG-NHE",
          image: "1711081011073-hp.png",
        },
        {
          name: "Laptop Dell Latitude 3420",
          price: 21399000,
          detailDesc:
            "Thiết kế bền đẹp, hiệu suất ổn định, hướng tới người dùng doanh nghiệp.",
          shortDesc: "Máy doanh nghiệp.",
          quantity: 99,
          factory: "DELL",
          target: "MONG-NHE",
          image: "1711081278418-dell-02.png",
        },
      ],
    });
  } else {
    console.log("Already init data");
  }
};

export default initDatabase;
