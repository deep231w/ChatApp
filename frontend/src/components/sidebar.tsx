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
        <div className="flex flex-col h-full bg-gray-600 ">

            <div className="p-4 border-b border-gray-300">
                <h2 className="text-lg font-semibold text-white">Available Users</h2>
            </div>

                <div className="flex-grow">
                    <ul className="space-y-2">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <li
                                    key={user.id}
                                    onClick={() => setSelectedUserId(user.id)}
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

                <div className="p-4 border-t border-gray-300 bg-white w-full">
                    <UserMenu />
                </div>
            </div>
    );
    // return (
    //     <div className="flex flex-col h-full w-1/4 bg-gray-100 p-4">
    //         <div>
    //             <h1>Available users</h1>
    //         </div>
    //         <div className="flex-grow">
    //             <ul>
    //                 <li>user 1</li>
    //                 <li>user 2</li>
    //                 <li>user 3</li>
    //             </ul>
    //         </div>
    //         <div className="bg-red-500 text-white w-full text-center p-2">
    //             user Menu
    //         </div>
    //     </div>
    // );

};
