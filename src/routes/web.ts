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

const router = express.Router();

const webRoute = (app: Express) => {
  router.get("/", getHomePage);

  // admin route
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getUsersPage);
  router.get("/admin/order", getOrdersPage);
  router.get("/admin/product", getProductsPage);

  // admin -user
  router.get("/create-user", getCreateUserPage);
  router.post("/handle-create-user", postCreateUser);
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUser);
  router.get("/handle-update-user/:id", getUpdateUser);
  router.post("/handle-update-user", postUpdateUser);

  app.use("/", router);
};

export default webRoute;
