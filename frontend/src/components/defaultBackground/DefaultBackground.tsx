const DefaultBackground = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="text-center px-4">
        <h1 className="text-4xl text-gray-700 font-semibold mb-2">No Chat Selected 💬</h1>
        <p className="text-gray-400 text-xl">
          Select a user from the sidebar to start a conversation.
        </p>
      </div>
    </div>
  );
};

export default DefaultBackground;
