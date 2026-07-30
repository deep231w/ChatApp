import React, { useState } from "react";
import { auth,googleAuth } from "../context/firebase";
import { createUserWithEmailAndPassword ,  signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleAuthBtn from "@/components/ui/SignupWithGoogleBtn";
import axios from "axios";
import AuthComponent from "./authComponent";
import { Loader2 } from "lucide-react";

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading]=useState<boolean>(false);

  const navigate = useNavigate();

  //manual signup
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!firstName || !lastName || !email || !password){
      alert("Please fill the credentials!!")
      return;
    }
    try {
      setLoading(true)
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      const token=await user.getIdToken();

      console.log("token in frontend", token);

      const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/user/passwordsignup`,{
        firstName:firstName,
        lastName:lastName,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }) 

      if(response.status===201){
        console.log("response of password signup=- ", response);
        
        const {user}= response.data;
        const {token}=response.data;
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem('token',token);
        console.log("user detail after signin setup in localstorage= ", user);
        navigate("/");
      }
      

    } catch (error) {
      console.error("Error signing up:", error);
    }finally{
      setLoading(false)
    }
  };

  //google signup
  const googleSignup= async()=>{
    try{
      const userCredentials= await signInWithPopup(auth, googleAuth);
      const user= userCredentials.user;
      const token= await user.getIdToken();
      console.log("google signin token- ", token);

      const nameParts = user.displayName?.split(" ") || [];
      const FirstName= nameParts[0] || "";
      const LastName= nameParts[1] || "";
      const response= await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/googlesignup`, {
        firstName:FirstName,
        lastName:LastName,
        email:user.email
      },{
        headers:{Authorization:`Bearer ${token}`},
        withCredentials:true
      })

      if(response.status===200){
        const {user}= response.data;
        localStorage.setItem("user",JSON.stringify(user))
        console.log("tpken after signup with google- " ,user);
        navigate("/");
      }
    }catch(e){
      console.log("error during signup= ", e);
    }
  }

  return (
    <AuthComponent>
      <div className="flex justify-center items-center h-full">
        <form 
          onSubmit={handleSignUp} 
          className="p-6  w-80  "
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {loading ? 
                <div
                    className="flex justify-center items-center"
                  >
                    <Loader2 className="w-5 h-5 animate-spin text-gray-800" />
                </div>:
                "Sign Up"}
            </button>
          
            <div className="flex items-center justify-center">
              <h1>OR</h1>
            </div>
            <div className="flex items-center justify-center">
            <GoogleAuthBtn onClick={googleSignup} placeholder={'SignUp with google'}/>
            </div>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <span 
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </AuthComponent>
  );
};

export default SignUp;