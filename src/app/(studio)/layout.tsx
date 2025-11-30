import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio - UAV 4 Everyone',
  description: 'Content management studio for UAV 4 Everyone',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {children}
    </div>
  )
}
