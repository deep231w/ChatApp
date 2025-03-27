import { DropdownMenuO } from "./ui/DropDownMenu";
export default function UserMenu() {
    console.log("UserMenu is rendering!");
    return (
        <div className="flex">
            <div>
                UserName
            </div>
            <div>
                <DropdownMenuO/>
            </div>
        </div>
    );
}
