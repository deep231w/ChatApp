import { useUsersContext } from "../context/usersContext";
import { useSelectedId } from "../context/selectedUserContext";
import UserMenu from "./userMenu";
import BrandLogo from "./ui/brandLogo";
import SearchComponent from "./searchComponent";
export const Sidebar = ({ onSelectuser, onRecivername }: { onSelectuser: (id: string) => void; onRecivername: (firstName: string) => void }) => {
    const { users, loading, error } = useUsersContext();
    const { selectedId, setSelectedUserId } = useSelectedId(); // Now correctly using the hook

    if (error) return <p>Server failed</p>;
    if (loading) return <p>Loading Please wait</p>;
    if (!users) return <p>Failed Loading!</p>;
    console.log("selected user id in sidebar= ",selectedId)

    return (
        <div className=" pt-2 flex flex-col h-full bg-white rounded-xl shadow-lg">

            <div className="p-4 ">
                <BrandLogo/>
            </div>
            <div>
                <SearchComponent/>
            </div>
                <div className="flex-grow p-2 pt-4">
                    <ul className="space-y-2">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <li
                                    key={user.id}
                                    onClick={() => setSelectedUserId(user.id)}
                                    className={`cursor-pointer border border-solid border-purple-500 rounded-r-lg font-bold transition-all duration-200 hover:bg-purple-300  ${selectedId === user.id ? "bg-purple-600 font-bold text-white p-1" : "text-gray-800 p-1"}`}
                                >
                                    {user.firstName}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 italic">No users Available</li>
                        )}
                    </ul>
                </div>

                <div className="p-4 border-t rounded-lg bg-fuchsia-400 bg-white w-full">
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
