import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { success, Error } from '../../layout/PopUp'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ViewSubCategories = () => {
  const [data, setData] = useState([])
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const API = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/sub-category`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData(res.data.Categories || [])
    } catch (err) {
      Error('Failed to load sub-categories')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/sub-category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      if (res.data.success) {
        success(res.data.message)
        fetchData()
      } else {
        Error(res.data.message)
      }
    } catch (err) {
      Error('Delete failed')
    }
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API}/sub-category/${editId}`,
        { sub_cat: editName },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (res.data.success) {
        success(res.data.message)
        setEditId(null)
        setEditName('')
        fetchData()
      } else {
        Error(res.data.message)
      }
    } catch (err) {
      Error('Update failed')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Sub Category List</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.category?.name}</td>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  item.sub_cat
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/createSubCategory/${item._id}`)}
                >
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  )
}

export default ViewSubCategories
