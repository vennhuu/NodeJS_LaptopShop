import express, { Express } from "express";
import {
  getCreateUserPage,
  getDashboardPage,
  getOrdersPage,
  getProductsPage,
  getUpdateUser,
  getUsersPage,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "controller/admin/dashboard.controller";
import { getHomePage } from "controller/user.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getDetailProductPage } from "controller/client/product.controller";
import {
  getCreateProduct,
  getUpdateProduct,
  getViewProduct,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "controller/admin/product.controller";
import { getLoginPage } from "controller/auth/login.controller";
import {
  getRegisterPage,
  postRegisterPage,
} from "controller/auth/register.controller";

const router = express.Router();

const webRoute = (app: Express) => {
  // client
  router.get("/", getHomePage);
  router.get("/product/:id", getDetailProductPage);

  // admin route
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getUsersPage);
  router.get("/admin/order", getOrdersPage);
  router.get("/admin/product", getProductsPage);

  // admin -user
  router.get("/create-user", getCreateUserPage);
  router.post(
    "/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser,
  );
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUser);
  router.get("/handle-update-user/:id", getUpdateUser);
  router.post(
    "/handle-update-user",
    fileUploadMiddleware("avatar"),
    postUpdateUser,
  );

  // admin - products
  router.get("/create-product", getCreateProduct);

  router.post(
    "/handle-create-product",
    fileUploadMiddleware("avatar"),
    postCreateProduct,
  );
  router.post("/handle-delete-product/:id", postDeleteProduct);
  router.get("/handle-view-product/:id", getViewProduct);
  router.get("/handle-update-product/:id", getUpdateProduct);
  router.post(
    "/handle-update-product",
    fileUploadMiddleware("avatar"),
    postUpdateProduct,
  );

  // auth
  router.get("/login", getLoginPage);
  router.get("/register", getRegisterPage);
  router.post("/register", postRegisterPage);

  app.use("/", router);
};

export default webRoute;
