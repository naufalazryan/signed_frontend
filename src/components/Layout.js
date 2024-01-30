import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children, useContainer = true }) => {
  const content = useContainer ? (
    <div className='min-w-[120vh] min-h-[80vh] flex items-center justify-center mx-auto  shadow-container rounded-xl relative overflow-hidden'>
      {children}
    </div>
  ) : (
    children
  )

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow w-full">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          {content}
        </main>
      </div>
    </div>
  )
}

export default Layout
