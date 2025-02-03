import axios from "axios";
import React, { useState, useEffect } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export const Sidebar = ({ onSelectuser, className }: { onSelectuser: (id: string) => void, className?: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveuser] = useState<User | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        setUsers(response.data);
      } catch (e) {
        console.log("Fetch error in Sidebar.tsx", e);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className={`flex h-screen `}>
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800">Available Users</h2>
        </div>
        <ul className="p-4 space-y-2">
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user.id}
                onClick={() => {
                  setActiveuser(user);
                  onSelectuser(user.id); // Corrected function call
                }}
                className={`px-3 py-2 rounded-md bg-white text-gray-700 shadow-sm hover:bg-gray-200 cursor-pointer ${
                  activeUser?.id === user.id ? "bg-gray-300" : ""
                }`}
              >
                {user.firstName} {user.lastName}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No users online</li>
          )}
        </ul>
      </div>
    </div>
  );
};
