import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { success, Error } from '../../layout/PopUp'
import { ToastContainer } from 'react-toastify'

const CreateCategory = () => {
  const { register, handleSubmit, reset } = useForm()
  const API = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API}/category`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        success(res.data.message)
        reset()
      } else {
        Error(res.data.message)
      }
    } catch (err) {
      Error('Something went wrong')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Create Category</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input type="text" id="name" className="form-control" {...register('name')}  />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default CreateCategory
