import React, { useState } from "react";
import { auth, googleAuth } from "../context/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ButtomWarning } from "@/components/buttomWarning";
import GoogleAuthBtn from "@/components/ui/SignupWithGoogleBtn";
import axios from "axios";
import { useAuth } from "../context/authContext";
import AuthComponent from "./authComponent";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("test-ac@mail.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { setLocalStorageUser } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      const token = await user.getIdToken();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signin`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        setLocalStorageUser(user);
        navigate("/");
      }
    } catch (err: any) {
      console.error("Error signing in:", err);
      setError(err?.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      const userCredentials = await signInWithPopup(auth, googleAuth);
      const user = userCredentials.user;
      const token = await user.getIdToken();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/loginWithGoogle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        setLocalStorageUser(user);
        navigate("/");
      }
    } catch (err: any) {
      console.error("error during google signin", err);
      setError(err?.message || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthComponent>
      <div className="rounded-[20px] border border-[#e5e7eb] bg-[#ffffff] p-5 shadow-[0_10px_25px_rgba(15,23,42,0.04)] sm:p-7">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">Welcome back</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Sign in</h2>
          <p className="mt-2 text-sm text-slate-500">Use your email to continue to your conversations.</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="signin-email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="h-11 w-full rounded-xl border border-[#dfe4ea] bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#dbeafe]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="signin-password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <button
                type="button"
                className="text-xs font-medium text-slate-500 transition hover:text-slate-700"
                onClick={() => navigate("/signup")}
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
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
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
          <div className="h-px flex-1 bg-[#e5e7eb]" />
          <span>or</span>
          <div className="h-px flex-1 bg-[#e5e7eb]" />
        </div>

        <GoogleAuthBtn
          onClick={handleGoogleSignin}
          placeholder={googleLoading ? "Signing in..." : "Continue with Google"}
        />

        <div className="mt-6">
          <ButtomWarning to="/signup" label={"New here?"} buttonText={" Create account"} />
        </div>
      </div>
    </AuthComponent>
  );
};

export default SignIn;
