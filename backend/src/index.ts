import express, {Request, Response} from "express" ;

const app=express();

app.get("/", (req:Request, res:Response)=>{
    res.send("hello")
    console.log("hoo");
})


app.listen(3000 , ()=>{
    console.log("app listening on 3000")
});