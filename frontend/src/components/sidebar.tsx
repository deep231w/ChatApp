import { useUsersContext } from "../context/usersContext";
import { useSelectedId } from "../context/selectedUserContext";
import UserMenu from "./userMenu";
export const Sidebar = ({ onSelectuser, onRecivername }: { onSelectuser: (id: string) => void; onRecivername: (firstName: string) => void }) => {
    const { users, loading, error } = useUsersContext();
    const { selectedId, setSelectedUserId } = useSelectedId(); // Now correctly using the hook

    if (error) return <p>Server failed</p>;
    if (loading) return <p>Loading Please wait</p>;
    if (!users) return <p>Failed Loading!</p>;
    console.log("selected user id in sidebar= ",selectedId)
    return (
        <div className={`flex h-screen`}>
            <div className="w-64 bg-gray-100 border-r border-gray-200 shadow-sm flex-1">
                <div className="p-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">Available Users</h2>
                </div>
                <div>
                    <ul className="p-4 space-y-2">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <li
                                    key={user.id}
                                    onClick={() => setSelectedUserId(user.id)} // Now setting selected user
                                    className={`cursor-pointer ${selectedId === user.id ? "font-bold text-blue-500" : "text-gray-800"}`}
                                >
                                    {user.firstName}
                                </li>
                        ))
                        ) : (
                        <li className="text-gray-500 italic">No users Available</li>
                        )}
                    </ul>
                </div>
                <div className="p-4 border-t border-gray-300 ">
                    <UserMenu/>
                </div>
            </div>
            
        </div>
    );
};
