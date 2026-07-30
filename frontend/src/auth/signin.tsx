import React, { useState } from "react";
import { auth, googleAuth } from "../context/firebase";
import { signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ButtomWarning } from "@/components/buttomWarning";
import GoogleAuthBtn from "@/components/ui/SignupWithGoogleBtn";
import axios from "axios";
import { useAuth } from "../context/authContext";
import AuthComponent from "./authComponent";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("test-ac@mail.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const {setLocalStorageUser}=useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const userCredentials= await signInWithEmailAndPassword(auth, email, password);
      const user= userCredentials.user;

      const token=await user.getIdToken();
      console.log("token after signin= ", token);

      const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/user/signin`,{},{
        headers:{Authorization:`Bearer ${token}`},
        withCredentials:true
      })
      if(response.status === 200){
        const {user}= response.data;
        localStorage.setItem("user",JSON.stringify(user))
        setLocalStorageUser(user);

        console.log("user detail after signin setup in localstorage= ", user);
        navigate("/");
      }
      console.log("Sending token in request:", `Bearer ${token}`);


      

    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const handleGoogleSignin= async()=>{
    try{
      const userCredentials =await signInWithPopup(auth, googleAuth);
      const user= userCredentials.user;
      const token= await user.getIdToken();
      console.log("token during googlre signin- ", token);

      const response= await  axios.post(`${import.meta.env.VITE_API_URL}/api/user/loginWithGoogle`,{},{
        headers:{Authorization:`Bearer ${token}`},
        withCredentials:true
      })

      console.log("response of google signin -" ,response);

      if (response.status === 200) {
        const { user } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        setLocalStorageUser(user);

        navigate("/");
      }
      

    }catch(e){
      console.log("error during google signin",e)
    }
  }
  return (
    <AuthComponent>
      <div className="flex justify-center items-center h-full ">
        <form 
          onSubmit={handleSignIn} 
          className=" p-6  w-80"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        
          <div className="flex items-center justify-center">
            <h1>OR</h1>
          </div>
          
          <div className="flex items-center justify-center">
            <GoogleAuthBtn onClick={handleGoogleSignin} placeholder={'SignIn with google'}/>
            {/* <button
              onClick={handleGoogleSignin}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >SignIn with Google</button> */}
          </div>
          <ButtomWarning to={"/signup"} label={"Doesn't have account?"} buttonText={" SignUp"}></ButtomWarning>
        </form>
      </div>
    </AuthComponent>
  );
};

export default SignIn;
