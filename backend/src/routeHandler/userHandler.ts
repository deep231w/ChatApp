import express, { Request, Response } from "express";
import Signin from "../routes/userRoutes/signInRoute";
import allUsers from "../routes/userRoutes/userFetch";
import GoogleSignUp from "../routes/userRoutes/googleSignupRoute";
import LoginWithGoogle from "../routes/userRoutes/loginWithGoogle";
import passwordSignUp from "../routes/userRoutes/signupWithPassword";
import SignInWithPassword from "../routes/userRoutes/signinWithPassword";

const router= express.Router();

router.post("/signin",Signin);

router.post("/googlesignup",GoogleSignUp);

router.post("/loginWithGoogle",LoginWithGoogle);

// router.post('/passwordsignup',passwordSignUp)

// router.post('/signinwithpassword',SignInWithPassword);

router.get("/", allUsers );

export default router;