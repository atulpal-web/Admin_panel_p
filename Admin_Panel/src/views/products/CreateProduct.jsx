import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { success, Error } from '../../layout/PopUp'
import { useParams } from 'react-router-dom'

const CreateProduct = () => {
  const { register, handleSubmit, watch, reset, setValue } = useForm()
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const selectedCategory = watch('category')
  const { id } = useParams()
  const API = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios
      .get(`${API}/category`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data.data || []))
      .catch(() => Error('Failed to fetch categories'))
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${API}/sub-category/by-category/${selectedCategory}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setSubCategories(res.data.data || []))
        .catch(() => Error('Failed to fetch sub-categories'))
    } else {
      setSubCategories([])
    }
  }, [selectedCategory])

  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          const { category, subCategory, p_name, p_price } = res.data.data

          setValue('category', category._id)
          setValue('p_name', p_name)
          setValue('p_price', p_price)

          const subCatRes = await axios.get(`${API}/sub-category/by-category/${category._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          setSubCategories(subCatRes.data.data || [])

          const validSub = subCatRes.data.data.find((sub) => sub._id === subCategory._id)
          setValue('subCategory', validSub ? subCategory._id : '')
        })
        .catch(() => Error('Failed to load product data'))
    }
  }, [id])

  const onSubmit = async (data) => {
    try {
      const url = id ? `${API}/products/${id}` : `${API}/products`
      const method = id ? 'put' : 'post'
      const res = await axios[method](url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        success(res.data.message)
        if (!id) reset()
      } else {
        Error(res.data.message)
      }
    } catch {
      Error(id ? 'Update failed' : 'Product creation failed')
    }
  }

  return (
    <div className="container mt-4">
      <h3>{id ? 'Update' : 'Create'} Product</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Select Category</label>
          <select className="form-select" {...register('category')} required>
            <option value="">-- Choose --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Sub Category</label>
          <select className="form-select" {...register('subCategory')} required>
            <option value="">-- Choose --</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.sub_cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" {...register('p_name')} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Price</label>
          <input type="number" className="form-control" {...register('p_price')} required />
        </div>

        <button type="submit" className="btn btn-success">
          {id ? 'Update' : 'Submit'}
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default CreateProduct
