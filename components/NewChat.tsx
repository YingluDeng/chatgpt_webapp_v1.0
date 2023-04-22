'use client'

import { db } from '@/firebase';
import { PlusIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function NewChat() {
    const router = useRouter();
    const { data: session } = useSession();

    const createNewChat = async() => {
        const doc = await addDoc(
            collection(db, "users", session?.user?.email!, "chats"), {
                // push these info to db
                messages: [],
                userId: session?.user?.email!,
                createdAt: serverTimestamp()
            }
        );

        //when click new chat, push to a new chat page
        router.push(`/chat/${doc.id}`)
    };

    return (
        <div
            onClick={createNewChat}  
            className="border-gray-700 border chatRow ">
            <PlusIcon className="h-4 w-4"/>
            <p>New chat</p>
        </div>
    )
}

export default NewChat
