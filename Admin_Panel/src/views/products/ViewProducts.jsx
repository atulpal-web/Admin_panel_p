import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { success, Error } from '../../layout/PopUp'
import { useNavigate } from 'react-router-dom'

const ViewProducts = () => {
  const [data, setData] = useState([])
  const [editId, setEditId] = useState(null)
  const [editProduct, setEditProduct] = useState({
    p_name: '',
    p_price: '',
  })

  const API = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setData(res.data.data || [])
    } catch (err) {
      Error('Failed to fetch products')
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        success(res.data.message)
        fetchProducts()
      } else {
        Error(res.data.message)
      }
    } catch {
      Error('Delete failed')
    }
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API}/products/${editId}`, editProduct, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        success(res.data.message)
        setEditId(null)
        setEditProduct({ p_name: '', p_price: '' })
        fetchProducts()
      } else {
        Error(res.data.message)
      }
    } catch {
      Error('Update failed')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Product List</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.category?.name}</td>
              <td>{item.subCategory?.sub_cat}</td>
              <td>
                {editId === item._id ? (
                  <input
                    className="form-control"
                    value={editProduct.p_name}
                    onChange={(e) => setEditProduct({ ...editProduct, p_name: e.target.value })}
                  />
                ) : (
                  item.p_name
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    className="form-control"
                    type="number"
                    value={editProduct.p_price}
                    onChange={(e) => setEditProduct({ ...editProduct, p_price: e.target.value })}
                  />
                ) : (
                  item.p_price
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/createProduct/${item._id}`)}
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

export default ViewProducts
