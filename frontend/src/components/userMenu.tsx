import { User } from "lucide-react";
import { DropdownMenuO } from "./ui/DropDownMenu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
export default function UserMenu() {
    console.log("UserMenu is rendering!");
    return (
        <div className="flex items-center justify-between">
            <div>
                UserName
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
