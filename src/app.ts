import express from "express";
import "dotenv/config";
import webRoute from "./routes/web";
import getConnection from "./config/db";
import initDatabase from "config/seed";
import { z } from "zod";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

const app = express();

const port = process.env.PORT || 8080;

// config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config session
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

// config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));

configPassportLocal();

// config global
app.use((req, res, next) => {
  res.locals.user = req.user || null; // pass user obj to all view
  next();
});
//config routes
webRoute(app);

// config static file: imgs/css/js
app.use(express.static("public"));

// seeding data
initDatabase();

// handle 404 not found
app.use((req, res) => {
  res.send("404 NOT FOUND");
});
// config route
app.listen(8080, () => {
  console.log(`My app is running on port ${port}`);
});
