'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";
import chat_logo from "../pic/ChatGPT_logo.png"

function Login() {
    return (
        <div className="bg-white h-screen flex flex-col items-center justify-center text-center space-y-3">
            <Image 
                src={chat_logo}
                width={500}
                height={500}
                alt="logo"
            />
            <p>Welcome to ChatGPT</p>
            <p>Log in with your OpenAI account to continue</p>
            <button onClick={() => signIn('google')}
            className="bg-[#6094d0] rounded-md py-2 px-4 text-white hover:bg-[#e35a74]">Log in</button>
        </div>
    )
}

export default Login
