import SideBar from '@/components/SideBar'
import '@/styles/globals.css'
import { SessionProvider } from '../components/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Login from '@/components/Login'
import ClientProvider from '../components/ClientProvider'

export const metadata = {
  title: 'ChatGPT Clone WebApp',
  description: 'ChatGPT Clone WebApp Header Title',
}


//log in -- has a session; log out -- no session
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  // console.log(session); check the info

  return (
    <html>
      <body>
        <SessionProvider session={session}>
          {!session ? ( //if no sesssion, pop out log in page
            <Login />
          ) : (
            <div className="flex">
            {/* sidebar */}
            {/* bg-[#202123]  */}
            {/* bg-gradient-to-r from-purple-300 to-pink-300  */}
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[17rem] ">
                <SideBar />
              </div>

              {/* clientProvider notification */}
              <ClientProvider />
              {/* bg-[#343541] */}
              {/* bg-gradient-to-r from-pink-500 */}
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>  
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
