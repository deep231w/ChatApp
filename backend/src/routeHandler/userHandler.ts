import express, { Request, Response } from "express";
import Signin from "../routes/userRoutes/signInRoute";
//import Signin from "../routes/userRoutes/signInRoute"
import allUsers from "../routes/userRoutes/userFetch";
import Signup from "../routes/userRoutes/signupRoute"
import LoginWithGoogle from "../routes/userRoutes/loginWithGoogle";

const router= express.Router();

router.post("/signin",Signin);

router.post("/signup",Signup);

router.post("/loginWithGoogle",LoginWithGoogle);

router.get("/", allUsers );

export default router;