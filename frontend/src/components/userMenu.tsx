import { User } from "lucide-react";
import { DropdownMenuO } from "./ui/DropDownMenu";
import { useAuth } from "../context/authContext";
export default function UserMenu() {
    console.log("UserMenu is rendering!");
    const {localstorageUser}=useAuth();
    return (
        <div className="flex items-center justify-between">
            <div className="text-l font-bold text-blue-500">
                {`${localstorageUser?.firstName} ${localstorageUser?.lastName}` }
            </div>
            <div>
            <DropdownMenuO />
            </div>
        </div>
    );
}
