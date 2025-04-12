import React, { useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Add({ editingItem, onSuccess }) {

    const url = 'https://jai-sweet-backend.onrender.com'

    const [image, setImage] = useState(null)
    const [data, setData] = useState({
        name: '',
        category: 'Dry Sweets',
        rate: [],
        image: null
    })
    const [newRate, setNewRate] = useState({ weight: '', price: '' })

    useEffect(() => {
        if (editingItem) {
            setData({
                name: editingItem.name,
                category: editingItem.category,
                rate: editingItem.rate || [],
                image: editingItem.image || null
            })
            if (editingItem.image) {
                setImage(`${url}${editingItem.image}`)
            }
        }
    }, [editingItem])

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setData({ ...data, image: file })
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleRateChange = (e) => {
        setNewRate({ ...newRate, [e.target.name]: e.target.value })
    }

    const addRate = () => {
        if (newRate.weight && newRate.price) {
            setData({ ...data, rate: [...data.rate, newRate] })
            setNewRate({ weight: '', price: '' })
        }
    }

    const removeRate = (index) => {
        setData({ ...data, rate: data.rate.filter((_, i) => i !== index) })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("category", data.category)
        formData.append("image", data.image)
        formData.append("rate", JSON.stringify(data.rate))
        try {
            if (editingItem) {
                const response = await axios.put(`${url}/api/food/update/${editingItem._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                if (response.data.success) {
                    toast.success(response.data.message)
                    onSuccess()
                }
                else {
                    toast.error(response.data.message)
                }
            }
            else {
                const response = await axios.post(`${url}/api/food/add`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                if (response.data.success) {
                    setData({
                        name: '',
                        category: 'Dry Sweets',
                        rate: [],
                        image: null
                    })
                    setNewRate({ weight: '', price: '' })
                    setImage(null)
                    toast.success(response.data.message)
                }
                else {
                    toast.error(response.data.message)
                }
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={handleSubmit}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                    <img 
                            src={
                                image instanceof File
                                    ? URL.createObjectURL(image)
                                    : image || assets.upload_area
                            }
                            alt=''
                        />
                    </label>
                    <input type='file' id='image' name='image' hidden onChange={handleImageUpload} />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input type='text' name='name' placeholder='Type here' onChange={handleChange} value={data.name} />
                </div>
                <div className='add-category'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' required onChange={handleChange}>
                            <option value="Dry Sweets">Dry Sweets</option>
                            <option value="Chhena Sweets">Chhena Sweets</option>
                        </select>
                    </div>
                </div>
                <div className='add-weight-price flex-col'>
                    <p>Weight & Price</p>
                    <div className='rate-input'>
                        <input type='text' name='weight' placeholder='Weight' value={newRate.weight} onChange={handleRateChange} />
                        <input type='number' name='price' placeholder='Price' value={newRate.price} onChange={handleRateChange} />
                        <button type='button' onClick={addRate}>Add weight & price</button>
                    </div>
                </div>
                {data.rate.length > 0 && (
                    <div className='added-rates'>
                        <p>Added Rates</p>
                        <ul>
                            {data.rate.map((rate, index) => (
                                <li key={index}>
                                    {rate.weight} - Rs.{rate.price}
                                    <button type='button' onClick={() => removeRate(index)}>X</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button type='submit' className='add-btn'>{editingItem ? 'UPDATE' : 'ADD'}</button>
            </form>
        </div>
    )
}