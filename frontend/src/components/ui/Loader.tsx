export default function Loader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#f3f5f7] px-5 text-center text-slate-800">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#dfe4ea] bg-white text-2xl shadow-sm">
          💬
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Pingify
        </h1>
      </div>

      <span className="loading loading-dots loading-lg text-slate-700"></span>

      <p className="text-base font-medium text-slate-600">
        Preparing your chat...
      </p>

      <div className="max-w-md border-l-[3px] border-red-500 pl-4 text-left">
        <p className="text-base font-semibold text-red-700">
          First request may take longer
        </p>
        <p className="mt-1 text-sm leading-6 text-red-600 sm:text-base">
          The backend runs on Render and may need a moment to wake up. Thanks for your patience!
        </p>
      </div>
    </div>
  );
}