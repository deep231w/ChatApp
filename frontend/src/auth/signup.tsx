import React, { useState } from "react";
import { auth,googleAuth } from "../context/firebase";
import { createUserWithEmailAndPassword ,  signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      const token=await user.getIdToken();

      console.log("token in frontend", token);

      const response= await axios.post("http://localhost:3000/api/user/signup",{
        firstName:firstName,
        lastName:lastName,
        email:email
      },{
        headers:{Authorization:`Bearer ${token}`},
        withCredentials:true
      }) 

      if(response.status===200){
        const {user}= response.data;
        localStorage.setItem("user",JSON.stringify(user))
        console.log("user detail after signin setup in localstorage= ", user);
      }
      navigate("/"); 
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  const googleSignup= async()=>{
    try{
      const userCredentials= await signInWithPopup(auth, googleAuth);
      const user= userCredentials.user;
      const token= await user.getIdToken();
      console.log("google signin token- ", token);
      const response= await axios.post("http://localhost:3000/api/user/signup", {
        firstName:user.displayName?.split("")[0] || "",
        lastName:user.displayName?.split("")[1] || "",
        email:user.email
      },{
        headers:{Authorization:`Bearer ${token}`},
        withCredentials:true
      })

    }catch(e){
      console.log("error during signup= ", e);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSignUp} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
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
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
          <br />
          <div><h1>OR</h1></div>
          <br />
          <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={googleSignup}
            className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
          >
            SignUp with Google
          </button>
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
  );
};

export default SignUp;