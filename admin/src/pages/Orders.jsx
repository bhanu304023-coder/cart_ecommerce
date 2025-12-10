import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'

const Orders = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white relative overflow-x-hidden">
      <Nav/>
      <Sidebar/>
    </div>
  )
}

export default Orders
