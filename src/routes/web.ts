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
import {
  getLoginPage,
  getSuccessRedirectPage,
  postLogout,
} from "controller/auth/login.controller";
import {
  getRegisterPage,
  postRegisterPage,
} from "controller/auth/register.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";

const router = express.Router();

const webRoute = (app: Express) => {
  // client
  router.get("/", getHomePage);
  router.get("/product/:id", getDetailProductPage);

  // admin route
  router.get("/admin", isAdmin, getDashboardPage);
  router.get("/admin/user", isAdmin, getUsersPage);
  router.get("/admin/order", isAdmin, getOrdersPage);
  router.get("/admin/product", isAdmin, getProductsPage);

  // admin -user
  router.get("/create-user", isAdmin, getCreateUserPage);
  router.post(
    "/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser,
  );
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", isAdmin, getViewUser);
  router.get("/handle-update-user/:id", isAdmin, getUpdateUser);
  router.post(
    "/handle-update-user",
    fileUploadMiddleware("avatar"),
    postUpdateUser,
  );

  // admin - products
  router.get("/create-product", isAdmin, getCreateProduct);

  router.post(
    "/handle-create-product",
    fileUploadMiddleware("avatar"),
    postCreateProduct,
  );
  router.post("/handle-delete-product/:id", postDeleteProduct);
  router.get("/handle-view-product/:id", isAdmin, getViewProduct);
  router.get("/handle-update-product/:id", isAdmin, getUpdateProduct);
  router.post(
    "/handle-update-product",
    fileUploadMiddleware("avatar"),
    postUpdateProduct,
  );

  // auth
  router.get("/success-redirect", getSuccessRedirectPage);
  router.get("/login", isLogin, getLoginPage);
  router.get("/register", getRegisterPage);
  router.post("/register", postRegisterPage);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success-redirect",
      failureRedirect: "/login",
      failureMessage: true,
    }),
  );
  router.post("/logout", postLogout);

  app.use("/", router);
};

export default webRoute;
