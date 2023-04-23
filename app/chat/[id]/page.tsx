import ChatInput from "../../../components/ChatInput";
import Chat from "../../../components/Chat";

type Props = {
    params: {
        id: string;
    };
};

function ChatPage({ params: { id } }: Props) {
    // (props)
    // console.log(props);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Chat */}
            <Chat chatId={id} />

            {/* ChatInput  */}
            <ChatInput chatId={id} />
        </div>
    )
}

export default ChatPage
