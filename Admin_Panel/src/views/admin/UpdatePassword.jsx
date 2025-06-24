import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { DocsComponents, DocsExample } from 'src/components'
import { Error, success } from '../../layout/PopUp';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const { handleSubmit, register } = useForm();
    const redirect = useNavigate();
    async function changePassword(data) {
        if (data.new_pass !== data.confirm_pass) {
            Error('Password Not Match')
        }
        else {
          const token = localStorage.getItem('token');
          await axios.post(`${import.meta.env.VITE_API_URL}/admin/update-password`, data, {
            headers: {
                Authorization:`Bearer ${token}`
              }
            })
                .then((res) => {
                    if (res.data.success) {
                        success(res.data.message);
                        setTimeout(() => redirect('/login'),3000);
                    }
                    else {
                        Error(res.data.message)
                    }
            })
        }
    }
  return (
    <CRow>
      <CCol xs={10} className="mx-auto my-3">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Change Password</strong>
          </CCardHeader>
          <CCardBody>
            <CForm method="post" onSubmit={handleSubmit(changePassword)}>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Old Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="exampleFormControlInput1"
                  placeholder="Enter your Old password"
                  {...register('user_pass')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">New Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="exampleFormControlInput1"
                  placeholder="Enter your New Password"
                  {...register('new_pass')}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Confirm Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="exampleFormControlInput1"
                  placeholder="Enter your Confirm Password"
                  {...register('confirm_pass')}
                />
              </div>
              <div className="mb-3">
                <CButton type="submit" className="btn-info">
                  Submit
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
          </CCol>
          <ToastContainer/>
    </CRow>
  )
}

export default UpdatePassword