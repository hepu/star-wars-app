import React from 'react'
import { useAuth } from '../../hooks/useAuth'

import './dashboard.css'

const DashboardPage = ({}) => {
  const {user} = useAuth()
  
  return (
    <div id="dashboard">
      <h2 className="mt-4">
        Welcome, {user.username}!
      </h2>
      <p>
        Navigate through the Menu to view all the information about Star Wars characters, planets and films!
      </p>
    </div>
  )
}

export default DashboardPage