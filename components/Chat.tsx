'use client';

import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

type Props = {
    chatId: string;
}

function Chat({ chatId }: Props) {
    const { data: session } = useSession();

    const [message] = useCollection(
        session && 
        query(
            collection(
                db, "users", session?.user?.email!, "chats", chatId, "messages"
            ),
            orderBy("createdAt", "asc")
        )
    );

    return (
        <div className="flex-1">
            {message?.docs.map((message) => (
                <Message key={message.id} message={message.data()} />
            ))}
        </div>
    )
}

export default Chat
