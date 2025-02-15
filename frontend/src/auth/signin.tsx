import React, { useState } from "react";
import { auth } from "../context/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ButtomWarning } from "@/components/buttomWarning";
import axios from "axios";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const userCredentials= await signInWithEmailAndPassword(auth, email, password);
      const user= userCredentials.user;

      const token=await user.getIdToken();
      console.log("token after signin= ", token);

      await axios.post("http://localhost:3000/api/user/signin",{},{
        headers:{Authorization:`Bearer ${token}`},
        withCredentials:true
      })
      console.log("Sending token in request:", `Bearer ${token}`);


      navigate("/");

    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

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
        <br />
        <ButtomWarning to={"/signup"} label={"Doesn't have account?"} buttonText={" SignUp"}></ButtomWarning>
      </form>
    </div>
  );
};

export default SignIn;
