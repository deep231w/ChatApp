import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountSettings from "./AccountSettings";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/context/firebase";

export default function UserSettings() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const { currentUser, localstorageUser, setCurrentUser } = useAuth()

    const navigate = useNavigate()

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setMenuOpen(!menuOpen)
    }

    const handleLogout = async () => {
        await signOut(auth)

        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setCurrentUser(null)
        navigate("/signin")
    }

    return (
        <div className="flex items-center justify-between gap-3 rounded-md border border-[#e5e7eb] bg-white px-2 py-2 shadow-sm">
            <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfe4ea] text-sm font-semibold text-slate-700">
                    {localstorageUser?.firstName?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                        {localstorageUser?.firstName + " " + localstorageUser?.lastName}
                    </p>
                    <p className="text-[11px] text-slate-500">online</p>
                </div>
            </div>

            <Button
                sx={{
                    minWidth: 0,
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    color: "#475569",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    "&:hover": {
                        backgroundColor: "#eef2f7",
                    },
                }}
                onClick={handleOpenMenu}
            >
                <SettingsIcon size={16} />
            </Button>

            <Menu
                open={menuOpen}
                anchorEl={anchorEl}
                onClose={() => setMenuOpen(false)}
            >
                <MenuItem
                    onClick={() => {
                        setModalOpen(true)
                        setMenuOpen(false)
                    }}
                    sx={{ fontSize: 14, paddingY: 1.1 }}
                >
                    Account Settings
                </MenuItem>
                <MenuItem onClick={() => handleLogout()} sx={{ fontSize: 14, paddingY: 1.1 }}>
                    Log Out
                </MenuItem>
            </Menu>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                keepMounted
            >
                <AccountSettings onClose={() => setModalOpen(false)} onLogout={handleLogout} />
            </Modal>
        </div>
    )
}