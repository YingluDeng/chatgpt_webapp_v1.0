'use client'

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat"

function SideBar() {
    const { data: session } = useSession();

    return (
        <div className="p-2 flex flex-col h-screen text-white">
            <div className="flex-1">
                <div>
                    {/* new Chat */}
                    <NewChat />
                    <div>
                        {/* model selection */}
                    </div>

                    {/* chatRow */}


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
