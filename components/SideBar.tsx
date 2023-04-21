import NewChat from "./NewChat"

function SideBar() {
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
        </div>
    )
}

export default SideBar
