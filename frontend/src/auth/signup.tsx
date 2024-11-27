// src/auth/signup.tsx
import React, { useState } from "react";
import { auth } from "../context/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const SignUp: React.FC = () => {
  const[firstName, setFirstName]=useState("");
  const[lastName, setLastName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredentials= await createUserWithEmailAndPassword(auth, email, password);
	  const user=userCredentials.user;

	  const response= await axios.post('http://localhost:3000/api/user/signup', {
			firstName,
			lastName,
			email,
			password,
			firebaseuid:user.uid
	  })
	  localStorage.setItem("token", response.data.token)
      navigate("/"); // Redirect to home after sign-up

    } catch (error) {
      console.error("Error signing up:", error);
	  
    }
  };

  return (
    <form onSubmit={handleSignUp}>
		<div>
			<input 
			type="text" 
			placeholder="First Name"
			onChange={(e)=>{setFirstName(e.target.value)}} />

			<input 
			type="text"
			placeholder="last name" 
			onChange={(e)=>{setLastName(e.target.value)}}
			/>

			<input
			 type="text" 
			 placeholder="Email"
			 onChange={(e)=>{setEmail(e.target.value)}}
			 />

			<input 
			type="text" 
			placeholder="Password" 
			onChange={(e)=>{setPassword(e.target.value)}}
			/>
			<button>signUp</button>
		</div>
	</form>
  );
};

export default SignUp;



{/* <form onSubmit={handleSignUp}>
<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
	  <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
		  <h1 className='text-3xl font-semibold text-center text-gray-300'>
			  Sign Up <span className='text-blue-500'> ChatApp</span>
		  </h1>

		  <form>
			  <div>
				  <label className='label p-2'>
					  <span className='text-base label-text'>Full Name</span>
				  </label>
				  <input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
			  </div>

			  <div>
				  <label className='label p-2 '>
					  <span className='text-base label-text'>Username</span>
				  </label>
				  <input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
			  </div>
	<div>
				  <label className='label p-2 '>
					  <span className='text-base label-text'>email</span>
				  </label>
				  <input onChange={(e)=>{setEmail(e.target.value)}}type='text' placeholder='Email' className='w-full input input-bordered h-10' />
			  </div>

			  <div>
				  <label className='label'>
					  <span className='text-base label-text'>Password</span>
				  </label>
				  <input
					  type='password'
					  placeholder='Enter Password'
					  className='w-full input input-bordered h-10'
				  />
			  </div>

			  <div>
				  <label className='label'>
					  <span className='text-base label-text'>Confirm Password</span>
				  </label>
				  <input onChange={(e)=>{setPassword(e.target.value)}}
					  type='password'
					  placeholder='Confirm Password'
					  className='w-full input input-bordered h-10'
				  />
			  </div>

			  <Link
				  to={"/login"}
				  className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
			  >
				  Already have an account?
			  </Link>

			  <div>
				  <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
			  </div>
		  </form>
	  </div>
  </div>
</form> */}
