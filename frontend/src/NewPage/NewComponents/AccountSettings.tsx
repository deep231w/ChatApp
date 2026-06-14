import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function AccountSettings(){
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                height:800,
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
                className="w-1/2 flex flex-col gap-4  items-center border-4 border-indigo-500"
            >
                <TextField
                    id="standard-basic" label="Standard" variant="standard"
                    defaultValue={"Deep maharana"}
                ></TextField>
                <TextField
                    label="Status"
                ></TextField>
                <TextField
                    label="Email"
                    disabled
                    defaultValue={"xyz@gmail.com"}
                ></TextField>
                <Button>SAVE</Button>
            </div>
            <div className="w-1/2 flex justify-center items-center border-4 border-indigo-100">
                <div
                    className="  rounded-[50%] bg-gray-300 h-[300px] w-[300px] flex justify-center items-center"
                >
                    Avatar
                </div>
            </div>
            
        </Box>
    )
}