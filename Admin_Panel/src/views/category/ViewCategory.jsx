import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { success, Error } from '../../layout/PopUp'
import { ToastContainer } from 'react-toastify'

const ViewCategories = () => {
  const [categories, setCategories] = useState([])
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const API = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/category`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCategories(res.data.data || [])
    } catch (err) {
      Error('Failed to load categories')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        success(res.data.message)
        fetchCategories()
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
        `${API}/category/${editId}`,
        { name: editName },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (res.data.success) {
        success(res.data.message)
        setEditId(null)
        setEditName('')
        fetchCategories()
      } else {
        Error(res.data.message)
      }
    } catch (err) {
      Error('Update failed')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Category List</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id}>
              <td>{index + 1}</td>
              <td>
                {editId === cat._id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editId === cat._id ? (
                  <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditId(cat._id)
                      setEditName(cat.name)
                    }}
                  >
                    Edit
                  </button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>
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

export default ViewCategories
