import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddPanel from './pages/AddPanel/AddPanel'
import Add from './pages/Add/Add'
import AddRestaurant from './pages/AddRestaurant/AddRestaurant'
import ListPanel from './pages/ListPanel/ListPanel'
import ListRestaurant from './pages/ListRestaurant/ListRestaurant'

export default function App() {

  const url = 'https://jai-sweet-backend.onrender.com'

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<AddPanel />}>
            <Route path='add-sweet' element={<Add />} />
            <Route path='add-restaurant' element={<AddRestaurant />} />
          </Route>
          <Route path='/list' element={<ListPanel />}>
            <Route path='sweet' element={<List />} />
            <Route path='restaurant' element={<ListRestaurant />} />
          </Route>
          <Route path='/orders' element={<Order />} />
        </Routes>
      </div>
    </div>
  )
}