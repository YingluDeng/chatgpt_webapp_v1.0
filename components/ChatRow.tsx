import { db } from "@/firebase";
import { deleteDoc, doc } from "@firebase/firestore";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link";

type Props = {
    id: string;
}

function ChatRow({id} : Props) {
    // const removeChat = async() => {
    //     await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    //     router.replace("/");
    // }

    return (
        <Link
            href={`/chat/${id}`}
            className={`chatRow justify-center `}
            // ${active && "bg-gray-700/50"}
        >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <p className="flex-1 hidden md:inline-flex truncare">New Chat</p>
            {/* {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"} */}
            <TrashIcon  className="h-5 w-5 text-white hover:text-red-700" />   
            {/* onClick={removeChat} */}
        </Link>
    )
}

export default ChatRow
