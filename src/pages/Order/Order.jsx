import React from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets.js'

export default function Order({url}) {
  const [orders, serOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/list')
    if(response.data.success){
      serOrders(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt='' />
            <div>
              <p className='order-item-food'>
                {order.products.map((item, index) => {
                  if(index === order.products.length - 1){
                    return item.name + ' x ' + item.quantity
                  }
                  else{
                    return item.name + ' x ' + item.quantity + ', '
                  }
                })}
              </p>
              <p className='order-item-name'>Name: {order.userId.name}</p>
              <p className='order-item-address'>Address: {order.address}</p>
              <p className='order-item-phone'>Phone: {order.phone}</p>
            </div>
            <p>Items: {order.products.length}</p>
            <p>Rs. {order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
