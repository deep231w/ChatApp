import React, { useState } from "react";
import { auth, googleAuth } from "../context/firebase";
import { signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ButtomWarning } from "@/components/buttomWarning";
import GoogleAuthBtn from "@/components/ui/SignupWithGoogleBtn";
import axios from "axios";
import { useAuth } from "../context/authContext";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {setLocalStorageUser}=useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const userCredentials= await signInWithEmailAndPassword(auth, email, password);
      const user= userCredentials.user;

      const token=await user.getIdToken();
      console.log("token after signin= ", token);

      const response= await axios.post("http://localhost:3000/api/user/signin",{},{
        headers:{Authorization:`Bearer ${token}`},
        withCredentials:true
      })
      if(response.status === 200){
        const {user}= response.data;
        localStorage.setItem("user",JSON.stringify(user))
        setLocalStorageUser(JSON.parse(user));

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

      const response= await  axios.post("http://localhost:3000/api/user/loginWithGoogle",{},{
        headers:{Authorization:`Bearer ${token}`},
        withCredentials:true
      })

      console.log("response of google signin -" ,response);

      if(response.status=== 200){
        const {user}= response.data;
        localStorage.setItem("user",JSON.stringify(user))
        console.log("user cookie after signin with google- ", user);
        navigate("/");
      }
      

    }catch(e){
      console.log("error during google signin",e)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSignIn} 
        className="bg-white p-6 rounded-lg shadow-md w-80"
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
  );
};

export default SignIn;
