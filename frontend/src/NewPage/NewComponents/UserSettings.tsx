import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import Box from "@mui/material/Box";

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
                <h2>Deepak Kumar </h2>
            </div>

            {/* <button 
                className="text-gray-600"
            >
                <SettingsIcon/>
            </button> */}
            <Button
                sx={{
                    color:"black"
                }}
                onClick={()=>setModalOpen(!modalOpen)}

            >
                <SettingsIcon/>
            </Button>
            {modalOpen && 

                <Modal
                    open={modalOpen}
                >
                   <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>

                </Modal>}
        </div>
    )
}