import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserWithRoleById } from "service/auth/auth.service";
import { comparePassword, handleViewUser } from "service/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, async function verify(
      req,
      username,
      password,
      callback,
    ) {
      const { session } = req as any;
      if (session?.messages?.length) {
        session.messages = [];
      }
      console.log("Check username/password", username, password);
      // check user exist in db
      const user = await prisma.user.findUnique({
        where: { username: username },
      });
      if (!user) {
        // throw new Error(`Username ${username} khong ton tai`);
        return callback(null, false, {
          message: `Username/password khong ton tai`,
        });
      }

      // compare password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        // throw new Error("Invalid Password");
        return callback(null, false, {
          message: "Username/password khong ton tai",
        });
      }
      return callback(null, user);
    }),
  );

  // data tra ve user
  passport.serializeUser(function (user: any, callback) {
    callback(null, { id: user.id, username: user.username });
  });

  // gan in4 ng dung vao req
  passport.deserializeUser(async function (user: any, callback) {
    const { id, username } = user;

    // query to db
    const userDB = await getUserWithRoleById(id);
    return callback(null, { ...userDB });
  });
};

export default configPassportLocal;
