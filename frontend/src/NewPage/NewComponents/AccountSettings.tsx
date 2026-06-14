import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CrosshairIcon, CrossIcon, XIcon } from "lucide-react";

export default function AccountSettings(){
    return (
        <Box
            sx={{
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                height:600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius:4,
                display:"flex",
                flex:"row",
                // justifyContent:"center",
                // alignItems:"center"
                
            }}
        >
            <div
                className="w-1/2 flex flex-col gap-4 justify-center items-center "
            >
                <TextField
                    id="standard-basic" label="Standard" variant="standard"
                    defaultValue={"Deep maharana"}
                ></TextField>
                <TextField
                    label="Status"
                    placeholder="At THe Gym"
                ></TextField>
                <TextField
                    label="Email"
                    disabled
                    defaultValue={"xyz@gmail.com"}
                ></TextField>
                
                <Button
                    
                    variant="contained"
                >SAVE</Button>
            </div>
            <div className="w-1/2 flex justify-center items-center ">
                <div
                    className="  rounded-[50%] bg-gray-300 h-[300px] w-[300px] flex justify-center items-center"
                >
                    Avatar
                </div>
            </div>

            <div
                className="absolute top-4 right-4"
            >
                <button
                    
                >
                    <XIcon/>
                </button>
            </div>            
        </Box>
    )
}