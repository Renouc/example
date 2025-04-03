import { FC } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="h-screen p-[20px]">{children}</div>
}

export default Layout
