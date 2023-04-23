import { db } from "@/firebase";
import { collection, deleteDoc, doc } from "@firebase/firestore";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
    id: string;
}

function ChatRow({id} : Props) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [ active, setActive ] = useState(false);

    const [messages] = useCollection(
        collection(db, "users", session?.user?.email!, "chats", id, "messages")
    );

    const removeChat = async() => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
        router.replace("/");
    }

    useEffect(() => {
        if (!pathname) return;

        setActive(pathname.includes(id));
    }, [pathname]);
    

    return (
        <Link
            href={`/chat/${id}`}
            className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
        >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <p className="flex-1 hidden md:inline-flex truncare">{messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}</p>
            <TrashIcon onClick={removeChat} className="h-5 w-5 text-white hover:text-red-700" />   
        </Link>
    )
}

export default ChatRow
