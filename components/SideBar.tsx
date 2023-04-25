'use client'

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat"
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, query, orderBy } from "@firebase/firestore";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
    const { data: session } = useSession();
    const [ chats, loadind, error ] = useCollection(
        session &&  //session should exist
        query(
            collection(db, "users", session.user?.email!, "chats"), //grab the chat
            orderBy("createdAt", "asc")
        )
    );

    // console.log(chats);
    return (
        <div className="p-2 flex flex-col h-screen text-white font-mono">
            <div className="flex-1">
                <div>
                    {/* new Chat */}
                    <NewChat />
                    <div className="hidden sm:inline">
                        {/* model selection */}
                        <ModelSelection />
                    </div>

                    {/* chatRow */}
                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}

                </div>
            </div>

            {session && (
                <div className="border-gray-700 chatRow items-center">
                    <img 
                        src={session.user?.image!} 
                        alt="profile pic"
                        className="h-6 w-6 rounded-sm cursor-pointer hover:opacity-50"
                    />
                    <p>{session.user?.name!}</p>
                </div>  
            )}
            <div onClick={() => signOut()}
                className="border-gray-700 chatRow items-center">
                <ArrowRightOnRectangleIcon className="h-4 w-4"/>
                <p>Log out</p>
            </div>

        </div>
    )
}

export default SideBar
