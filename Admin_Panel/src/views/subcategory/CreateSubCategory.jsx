import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { success, Error } from '../../layout/PopUp'
import { useParams } from 'react-router-dom'

const CreateSubCategory = () => {
  const { register, handleSubmit, reset, setValue } = useForm()
  const [categories, setCategories] = useState([])
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
    if (id) {
      axios
        .get(`${API}/sub-category/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { category, sub_cat } = res.data.data
          setValue('category', category._id)
          setValue('sub_cat', sub_cat)
        })
        .catch(() => Error('Failed to fetch sub-category'))
    }
  }, [id])

  const onSubmit = async (data) => {
    try {
      const url = id ? `${API}/sub-category/${id}` : `${API}/sub-category`
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
      Error(id ? 'Update failed' : 'Creation failed')
    }
  }

  return (
    <div className="container mt-4">
      <h3>{id ? 'Update' : 'Create'} Sub Category</h3>
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
          <label className="form-label">Sub Category Name</label>
          <input type="text" className="form-control" {...register('sub_cat')} required />
        </div>
        <button type="submit" className="btn btn-success">
          {id ? 'Update' : 'Submit'}
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default CreateSubCategory
