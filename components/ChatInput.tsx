'use client';

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
// import dynamic from "next/dynamic";
import { useState, FormEvent } from "react";
import toast, { Toaster } from 'react-hot-toast';


type Props = {
    chatId: string;
}

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("");
    const [loading, setIsLoading] = useState(true);
    const { data: session } = useSession();

    //TODO: useSWR to get model
    const model = "text-davinci-003";

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!prompt) return;
            
            const input = prompt.trim();  
            setPrompt("");

            setIsLoading(false);

            const message: Message = {
                text: input,
                createdAt: serverTimestamp(),
                user: {
                    _id: session?.user?.email!,
                    name: session?.user?.name!,
                    avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
                },
            };

            await addDoc(
                collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
                message
            )

            // notification loading
            const notification = toast.loading('Sending...');

            await fetch('../pages/api/auth/askQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: input,
                    chatId, 
                    model, 
                    session,
                }),
            }).then(() => {
                toast.success('Sent successfully.', {
                    id: notification
                    // style: {
                    //     borderRadius: '10px',
                    //     background: '#fff',
                    //     color: '#6094d0',
                    // },
                    // iconTheme: {
                    //   primary: '#e35a74',
                    //   secondary: '#fff',
                    // },
                });
                setIsLoading(true);
            });
            // <Toaster />
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="bg-gray-700/50 text-white rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <input 
                    className="
                        bg-transparent 
                        focus:outline-none 
                        flex-1 
                        disabled:cursor-not-allowed 
                        disabled:text-grey-300"
                    disabled={!session}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    type="text" 
                    placeholder="Send a message..."
                />

                {/* send button */}
                <button 
                    disabled={!prompt || !session} 
                    type="submit"
                    className="text-gray-200 
                        hover:  px-2 py-1 rounded
                        disabled:text-gray-600 disabled:cursor-not-allowed"
                    >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45 " />
                </button>
            </form>

            <div>
                {/* ModelSelection */}
            </div>
        </div>
    )
}

export default ChatInput
