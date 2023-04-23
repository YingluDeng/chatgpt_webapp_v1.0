'use client';

import { Toaster } from "react-hot-toast";

// function ClientProvider() {
//     return (
//         <div>
//             <Toaster position="top-center" />
//         </div>
//     )
// }

// export default ClientProvider;


export default function ClientProvider() {
    return (
        <>
            <Toaster position="top-right" />
        </>
    )
}