import { Link } from "react-router-dom";

export const ButtomWarning= ({label, to, buttonText})=>{
    return <div className="py-2 text-sm flex justify-center font-sans 	font-family: ui-sans-serif ">
    <div className="text-center text-gray-600">
        {label}
    </div>
    <Link to={to} className="text-blue-500 cursor-pointer hover:underline" > { buttonText} </Link>
    </div>
}