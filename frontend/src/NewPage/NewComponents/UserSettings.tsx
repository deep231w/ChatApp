import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountSettings from "./AccountSettings";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/context/firebase";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserSettings(){
    
    const [modalOpen ,  setModalOpen]=useState<boolean>(false)
    const [menuOpen, setMenuOpen]=useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {currentUser, localstorageUser ,setCurrentUser}= useAuth();

    const navigate=useNavigate()
    console.log("cr= ", currentUser , localstorageUser)
    const handleOPenMenu=(event: React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorEl(event.currentTarget);
        setMenuOpen(!menuOpen)
    }

    const handleLogout =async ()=>{
        await signOut(auth);

        localStorage.removeItem("user");
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/signin')
    }
    return (
        <div
            className=" 
                h-[70px] rounded-t-xl bg-gray-400
                flex flex-row justify-between items-center ml-3 mr-3 p-3
            "
        >
            <div
                className="flex flex-row gap-1 items-center"
            >
                <div
                    className="h-[40px] w-[40px] bg-gray-300 rounded-[50%]"
                >

                </div>
                <h2>{localstorageUser?.firstName + " "+localstorageUser?.lastName}</h2>
            </div>

            <Button
                sx={{
                    color:"black"
                }}
                onClick={handleOPenMenu}
            >
                <SettingsIcon/>
            </Button>

            <Menu
                open={menuOpen}
                anchorEl={anchorEl}
                onClose={()=>setMenuOpen(false)}
            >
                <MenuItem onClick={()=>{
                    setModalOpen(!modalOpen) 
                    setMenuOpen(false)}}
                >
                    Account Settings
                </MenuItem>

                <MenuItem
                    onClick={()=>handleLogout()}
                >Log Out</MenuItem>
            </Menu>
            {modalOpen && 

                <Modal
                    open={modalOpen}
                    onClose={()=>setModalOpen(false)}
                >
                    <AccountSettings/>
                </Modal>}
        </div>
    )
}