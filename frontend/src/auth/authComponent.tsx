
type AuthComponentProps = {
  children: React.ReactNode;
};

export default function AuthComponent({children}:AuthComponentProps) {
  console.log("AuthComponent rendered");

  return (
    <div className="flex h-screen">
      <div className="w-2/5 bg-gray-100 flex justify-center items-center">
        <div className="fixed top-0 left-0 right-0 p-8">
            <h1 className="flex items-center gap-3 text-2xl font-bold text-black">
                <img src="/chat.png" alt="Chat" width={70} height={70} />
                <span>PingiFy</span>
            </h1>
        </div>
        {children}
      </div>
      <div className="w-3/5 bg-gradient-to-br from-sky-600 via-indigo-600 to-violet-700 flex items-center justify-center relative overflow-hidden">
  {/* Background circles */}
  <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
  <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

  <div className="relative z-10 max-w-lg text-center px-8">
    <h1 className="text-5xl font-bold text-white">
      Welcome to <span className="text-cyan-300">PingiFy</span>
    </h1>

    <p className="mt-6 text-lg leading-8 text-slate-200">
      Stay connected with the people who matter most.
      Fast, secure, and real-time conversations—wherever you are.
    </p>

    <div className="mt-10 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
      <p className="text-sm italic text-slate-100">
        "Every message begins with a simple ping."
      </p>
    </div>
  </div>
</div>
    </div>
  );
}