import React, { useEffect, useState } from 'react'
import './ListRestaurant.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import AddRestaurant from '../AddRestaurant/AddRestaurant'

export default function ListRestaurant() {

  const url = 'https://jai-sweet-backend.onrender.com'

  const [list, setList] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/restaurant/list`)
      if (response.data.success) {
        const sortedList = response.data.data.sort((a, b) => a.name.localeCompare(b.name))
        setList(sortedList)
      }
      else {
        toast.error("Error")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/restaurant/delete/${id}`)
      if (response.data.success) {
        toast.success("Food deleted")
        setList(list.filter((item) => item._id !== id))
      }
      else {
        toast.error("Error")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setShowAddForm(true)
  }

  const handleSuccess = () => {
    fetchList()
    setEditingItem(null)
    setShowAddForm(false)
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <div className='list add flex-col'>
      {showAddForm && (
        <AddRestaurant editingItem={editingItem} onSuccess={handleSuccess} />
      )}
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          {/*<b>Image</b>*/}
          <b>Name</b>
          <b>Category</b>
          <b>Sub Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              {/*<img src={`${url}${item.image}`} alt='' />*/}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.subcategory}</p>
              <p>Rs. {item.price}</p>
              <div className='action-buttons'>
                <p className='cursor' onClick={() => handleEdit(item)}>✏️</p>
                <p className='cursor' onClick={() => removeFood(item._id)}>❌</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}