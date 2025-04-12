import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './AddRestaurant.css'

export default function AddRestaurant({ editingItem, onSuccess }) {

    const url = 'https://jai-sweet-backend.onrender.com'
    
    /*const [image, setImage] = useState(null)*/
    const [data, setData] = useState({
        name: '',
        category: 'Bhajipodi',
        subcategory: '',
        price: ''
        /*image: null*/
    })

    const subCategories = {
        Bhajipodi: ['Beverages', 'Mocktail', 'Shakes', 'Soups', 'South Indian', 'Chinese', 'Sandwich & Pizza', 'Pasta & Burger', 'Snacks', 'Sweets', 'Ice Cream'],
        LaChef: ['Beverages', 'Soups', 'Shakes', 'South Indian', 'Mocktail', 'Sandwich', 'Add Ons', 'Pasta & Burger', 'Pizza', 'Chinese Starters', 'Main Course', 'Rice', 'Dal & Sabzian', 'Tawa Se', 'Kebab-e-pitara', 'Jain Food', 'Breads', 'Ice cream & Sweets', 'Salad & Raita', 'Rice', 'Thali']
    }

    useEffect(() => {
        if (editingItem) {
            setData({
                name: editingItem.name,
                category: editingItem.category,
                subcategory: editingItem.subcategory,
                price: editingItem.price,
                /*image: editingItem.image || null*/
            })
            /*if (editingItem.image) {
                setImage(`${url}${editingItem.image}`)
            }*/
        }
    }, [editingItem])

    /*const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setData({ ...data, image: file })
        }
    }*/

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === 'category'){
            setData({...data, category: value, subcategory: ''})
        }
        else{
            setData({...data, [name]: value})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("category", data.category)
        formData.append("subcategory", data.subcategory)
        formData.append("price", data.price)
        /*formData.append("image", data.image)*/
        try {
            if (editingItem) {
                const response = await axios.put(`${url}/api/restaurant/update/${editingItem._id}`, formData, {
                    headers: { 'Content-Type': 'application/json' }
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
                const response = await axios.post(`${url}/api/restaurant/add`, formData, {
                    headers: { 'Content-Type': 'application/json' }
                })
                if (response.data.success) {
                    setData({
                        name: '',
                        category: 'Bhajipodi',
                        subcategory: '',
                        price: '',
                        /*image: null*/
                    })
                    /*setImage(null)*/
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
                {/*<div className='add-img-upload flex-col'>
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
                </div>*/}
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input type='text' name='name' placeholder='Type here' onChange={handleChange} value={data.name} />
                </div>
                <div className='add-category'>
                    <div className='add-category flex-col'>
                        <p>Restaurant Category</p>
                        <select name='category' required onChange={handleChange} value={data.category}>
                            <option value="Bhajipodi">Bhajipodi</option>
                            <option value="LaChef">LaChef</option>
                        </select>
                    </div>
                    <div className='add-category flex-col'>
                        <p style={{marginTop: 10}}>SubCategory</p>
                        <select name='subcategory' required onChange={handleChange} value={data.subcategory}>
                            <option value=''>Select Subcategory</option>
                            {subCategories[data.category]?.map((sub, index) => (
                                <option key={index} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Price</p>
                    <input type='number' name='price' placeholder='Type here' onChange={handleChange} value={data.price} />
                </div>
                <button type='submit' className='add-btn'>{editingItem ? 'UPDATE' : 'ADD'}</button>
            </form>
        </div>
    )
}