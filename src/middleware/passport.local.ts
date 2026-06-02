import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "service/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(async function verify(username, password, callback) {
      console.log("Check username/password", username, password);
      // check user exist in db
      const user = await prisma.user.findUnique({
        where: { username: username },
      });
      if (!user) {
        // throw new Error(`Username ${username} khong ton tai`);
        return callback(null, false, {
          message: `Username ${username} khong ton tai`,
        });
      }

      // compare password
      const isMatch = comparePassword(password, user.password);
      if (!isMatch) {
        // throw new Error("Invalid Password");
        return callback(null, false, {
          message: "Invalid Password",
        });
      }
      return callback(null, user);
    }),
  );
};

export default configPassportLocal;
