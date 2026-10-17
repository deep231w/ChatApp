type AuthComponentProps = {
  children: React.ReactNode;
};

export default function AuthComponent({ children }: AuthComponentProps) {
  return (
    <div className="min-h-screen w-full bg-[#f3f5f7] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#dfe4ea] bg-white shadow-sm">
              <img src="/chat.png" alt="PingiFy logo" className="h-7 w-7 object-contain" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Messaging</p>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">PingiFy</h1>
            </div>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center pb-8 pt-4">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
}