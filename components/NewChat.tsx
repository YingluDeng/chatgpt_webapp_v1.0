import { PlusIcon } from '@heroicons/react/24/solid';

function NewChat() {
    return (
        <div
            // onClick={createNewChat}  
            className="border-gray-700 border chatRow text-white">
            <PlusIcon className="h-4 w-4"/>
            <p>New chat</p>
        </div>
    )
}

export default NewChat
