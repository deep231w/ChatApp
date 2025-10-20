import express from 'express';
import passwordSignUp from '../routes/userRoutes/signupWithPassword';
import SignInWithPassword from '../routes/userRoutes/signinWithPassword';

const router = express.Router();

router.post('/passwordsignup',passwordSignUp)

router.post('/signinwithpassword',SignInWithPassword);

export default router;