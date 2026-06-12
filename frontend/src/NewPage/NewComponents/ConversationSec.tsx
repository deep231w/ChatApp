import { SendIcon } from "lucide-react";
import { FiSmile } from "react-icons/fi";

export default function ConversationSec(){

    const messages=[
        {
            role:"sender",
            message:"Hi"
        },
        {
            role:"reciever",
            message:"Heloo"
        },
        {
            role:"sender",
            message:"YO WASSUP"
        },
        {
            role:"reciever",
            message:"You asked for a big paragraph, and that is exactly what we are going to build. At its core, an effective large paragraph is an exploration of a single controlling idea that weaves through an interconnected chain of thought. If you let your mind wander and explore the details, a simple concept organically blossoms into something complex and deeply immersive."
        },
        {
            role:"sender",
            message:"Take, for instance, the evolution of the modern digital landscape. What began decades ago as a localized, clunky network of static information has rapidly mutated into a sprawling, hyper-connected global web that dictates nearly every aspect of our daily routines. We rely on these virtual infrastructures not just to consume endless streams of content, but to work, to socialize, and to navigate our physical environments. As these digital ecosystems expand, they continuously demand more of our attention, fundamentally altering how we process information and creating an environment where deep, uninterrupted focus has become a rare and highly sought-after commodity."
        },
        {
            role:"sender",
            message:"Hi"
        },
        {
            role:"reciever",
            message:"A long paragraph typically exceeds 8 to 15 sentences or roughly 200 to 300 words. In writing, paragraphs should generally cover only one main idea; long paragraphs often indicate that multiple ideas "
        },
        {
            role:"sender",
            message:"Hi"
        },
        {
            role:"reciever",
            message:"Heloo"
        },
        {
            role:"sender",
            message:"YO WASSUP"
        },
        {
            role:"reciever",
            message:"You asked for a big paragraph, and that is exactly what we are going to build. At its core, an effective large paragraph is an exploration of a single controlling idea that weaves through an interconnected chain of thought. If you let your mind wander and explore the details, a simple concept organically blossoms into something complex and deeply immersive."
        },
        {
            role:"sender",
            message:"Take, for instance, the evolution of the modern digital landscape. What began decades ago as a localized, clunky network of static information has rapidly mutated into a sprawling, hyper-connected global web that dictates nearly every aspect of our daily routines. We rely on these virtual infrastructures not just to consume endless streams of content, but to work, to socialize, and to navigate our physical environments. As these digital ecosystems expand, they continuously demand more of our attention, fundamentally altering how we process information and creating an environment where deep, uninterrupted focus has become a rare and highly sought-after commodity."
        },
        {
            role:"sender",
            message:"Hi"
        },
        {
            role:"reciever",
            message:"A long paragraph typically exceeds 8 to 15 sentences or roughly 200 to 300 words. In writing, paragraphs should generally cover only one main idea; long paragraphs often indicate that multiple ideas "
        }
    ]
    return (
        <div
            className="relative flex flex-col justify-between h-screen ml-3 mr-3"
        >
            {/* <div
                className="absolute h-full w-full flex flex-col justify-between"
            > */}

                {/* top bar */}
                <div 
                    className="bg-gray-100 h-[70px] w-full rounded-b-xl flex items-center p-2 gap-2"
                >
                    {/* avatar */}
                    <div
                        className="w-[40px] h-[40px] bg-gray-500 rounded-[50%]"
                    >

                    </div>
                    {/* user name */}
                    <div>
                        <h2
                            className="text-xl text-gray-700 text-bold"
                        >John Doe</h2>
                    </div>

                </div>

                {/* conversation */}

                <div
                    className="flex flex-1 flex-col p-2 gap-3 overflow-y-auto"
                >
                    {messages.map((m ,i)=>(
                        <div
                            key={i}
                            className={`flex 
                                ${m.role==="sender"?
                                            "justify-end ":
                                            "justify-start"
                                }    
                            `}
                        >
                            <div
                                className={`border p-2 rounded-lg w-auto max-w-xl

                                        ${m.role==="reciever"?
                                                    "bg-slate-800 text-gray-400 justify-end":
                                                    "bg-white text-gray-700 justify-end"
                                        }
                                    `}
                            >
                                {m.message}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Bottom bar */}
                <div
                    className="bg-gray-100 h-[70px] w-full rounded-t-xl flex flex-row p-3 gap-2"
                >
                    <input 
                        className="w-full rounded-xl bg-gray-300 text-black p-2 "
                        type="text"
                        placeholder="Type Message ....." 
                    />

                    <button
                        className="bg-yellow-300 hover:bg-yellow-200 text-gray-600 px-4 py-2 rounded-lg shadow-md"
                    >
                        <FiSmile size={24} />
                    </button>

                    <button
                        className="bg-blue-400 hover:bg-blue-300 text-gray-600 px-4 py-2 rounded-lg shadow-md"
                    >
                        <SendIcon/>
                    </button>
                </div>
            {/* </div> */}

            
        </div>
    )
}