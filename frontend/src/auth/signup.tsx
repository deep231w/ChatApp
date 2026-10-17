import React, { useState } from "react";
import { auth, googleAuth } from "../context/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleAuthBtn from "@/components/ui/SignupWithGoogleBtn";
import axios from "axios";
import AuthComponent from "./authComponent";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ButtomWarning } from "@/components/buttomWarning";

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      const token = await user.getIdToken();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/passwordsignup`,
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const { user } = response.data;
        const { token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (err: any) {
      console.error("Error signing up:", err);
      setError(err?.message || "Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      const userCredentials = await signInWithPopup(auth, googleAuth);
      const user = userCredentials.user;
      const token = await user.getIdToken();

      const nameParts = user.displayName?.split(" ") || [];
      const FirstName = nameParts[0] || "";
      const LastName = nameParts[1] || "";

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/googlesignup`,
        {
          firstName: FirstName,
          lastName: LastName,
          email: user.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (err: any) {
      console.error("error during signup= ", err);
      setError(err?.message || "Google sign-up failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthComponent>
      <div className="rounded-[20px] border border-[#e5e7eb] bg-[#ffffff] p-5 shadow-[0_10px_25px_rgba(15,23,42,0.04)] sm:p-7">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">Create account</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Sign up</h2>
          <p className="mt-2 text-sm text-slate-500">Create a new account to start messaging.</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="signup-firstname" className="block text-sm font-medium text-slate-700">
                First name
              </label>
              <input
                id="signup-firstname"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#dfe4ea] bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#dbeafe]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="signup-lastname" className="block text-sm font-medium text-slate-700">
                Last name
              </label>
              <input
                id="signup-lastname"
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#dfe4ea] bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#dbeafe]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#dfe4ea] bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#dbeafe]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#dfe4ea] bg-white px-3.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#dbeafe]"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 transition hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-[#fecaca] bg-[#fff1f2] px-3 py-2 text-sm text-[#991b1b]">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          <div className="h-px flex-1 bg-[#e5e7eb]" />
          <span>or</span>
          <div className="h-px flex-1 bg-[#e5e7eb]" />
        </div>

        <GoogleAuthBtn
          onClick={googleSignup}
          placeholder={googleLoading ? "Creating account..." : "Continue with Google"}
        />

        <div className="mt-6">
          <ButtomWarning to="/signin" label={"Already have an account?"} buttonText={" Sign in"} />
        </div>
      </div>
    </AuthComponent>
  );
};

export default SignUp;