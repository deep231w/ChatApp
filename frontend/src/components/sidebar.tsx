import React, { useState, useEffect } from "react";

export const Sidebar = ({ socket ,className}: { socket: any, className?:string }) => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    // Listen for updates to the online users list from the server
    socket.on("online_users", (onlineUsers: string[]) => {
      setUsers(onlineUsers);
    });

    // Clean up the socket listener on component unmount
    return () => {
      socket.off("online_users");
    };
  }, [socket]);

  return (
    <div className="h-screen w-64 bg-gray-100 border-r border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">Online Users</h2>
      </div>
      <ul className="p-4 space-y-2">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user}
              className="px-3 py-2 rounded-md bg-white text-gray-700 shadow-sm hover:bg-gray-200"
            >
              {user}
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No users online</li>
        )}
      </ul>
    </div>
  );
};

//export default Sidebar;