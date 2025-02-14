import express, { Request, Response } from "express";
import Signin from "../routes/userRoutes/signInRoute";
import allUsers from "../routes/userRoutes/userFetch";
const router= express.Router();

router.post("/signin",Signin);

router.post("/signup",);

router.get("/", allUsers );

export default router;