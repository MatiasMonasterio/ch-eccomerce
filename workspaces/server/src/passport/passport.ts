import passport from "passport";
import { local, jwt } from "./strategies";

// passport.serializeUser((_user, done) => {
//   done(null, {});
// });

// passport.deserializeUser((_userCookie, done) => {
//   const user = {};
//   done(null, user);
// });

passport.use("jwt", jwt);
passport.use("login", local.login);
passport.use("register", local.register);

export default passport;
