import { DocumentData } from "firebase/firestore";

type Props = {
    message: DocumentData;
};

function Message({message} : Props) {
    return (
        <div>
            Message
        </div>
    )
};

export default Message;

