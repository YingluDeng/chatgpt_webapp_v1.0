import SideBar from '@/components/SideBar'
import '@/styles/globals.css'

export const metadata = {
  title: 'ChatGPT Clone WebApp',
  description: 'ChatGPT Clone WebApp Header Title',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">

          {/* sidebar */}
          <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[17rem] ">
            <SideBar />
          </div>

          {/* clientProvider notification */}

          <div className="bg-[#343541] flex-1">{children}</div>
        </div>  
      </body>
    </html>
  )
}
