import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  getUpdateUser,
  getViewUser,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "controller/user.controller";

const router = express.Router();

const webRoute = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/create-user", getCreateUserPage);
  router.post("/handle-create-user", postCreateUser);
  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUser);
  router.get("/handle-update-user/:id", getUpdateUser);
  router.post("/handle-update-user", postUpdateUser);

  app.use("/", router);
};

export default webRoute;
