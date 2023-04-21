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
      <body>{children}</body>
    </html>
  )
}
