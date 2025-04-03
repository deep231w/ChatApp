import { User } from "lucide-react";
import { DropdownMenuO } from "./ui/DropDownMenu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { useAuth } from "../context/authContext";
export default function UserMenu() {
    console.log("UserMenu is rendering!");
    const {localstorageUser}=useAuth();
    return (
        <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-blue-500">
                {localstorageUser.firstName}
            </div>
            <div>
            <DropdownMenuO>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenuO>
            </div>
        </div>
    );
}
