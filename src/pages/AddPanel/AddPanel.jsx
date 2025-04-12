import React from 'react'
import './AddPanel.css'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function AddPanel() {

  const location = useLocation()

  return (
    <div className="add-panel">
      <div className="tab-buttons">
        <Link to='add-sweet'>
          <button
            className={location.pathname.includes('add-sweet') ? 'active' : ''}
          >
            🍬 Add Sweets
          </button>
        </Link>
        <Link to='add-restaurant'>
        <button
          className={location.pathname.includes('add-restaurant') ? 'active' : ''}
        >
          🍽️ Add Restaurant
        </button>
        </Link>
      </div>
      <Outlet />
    </div>
  )
}