import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './ListPanel.css'

export default function ListPanel() {

  const location = useLocation()

  return (
    <div className="list-panel">
      <div className="tab-buttons">
        <Link to="sweet">
          <button className={location.pathname.includes('sweet') ? 'active' : ''}>
            🍬 Sweets Item List
          </button>
        </Link>
        <Link to="restaurant">
          <button className={location.pathname.includes('restaurant') ? 'active' : ''}>
            🍽️ Restaurants Item List
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  )
}