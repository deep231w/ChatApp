export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-3xl font-bold text-purple-600">PinGify 💬</h1>
      <span className="loading loading-dots loading-xl text-purple-600"></span>
      <p className="text-sm text-gray-500">Preparing your chat...</p>
    </div>
  );
}
