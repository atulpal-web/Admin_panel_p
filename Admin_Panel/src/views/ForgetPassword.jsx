import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { Error, success } from '../layout/PopUp'

const ForgetPassword = () => {
  const { register, handleSubmit } = useForm();
  const redirect = useNavigate();
  async function signIn(data) {
    await axios.post(`${import.meta.env.VITE_API_URL}/admin/sendOtp`, data)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
            success(res.data.message);
            // redirect('/change-password')
        }
        else {
          Error(res.data.message);
        }
      })
    .catch((err)=>console.log(err))
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm method='post' onSubmit={handleSubmit(signIn)}>
                    <h1>Forget Your Password?</h1>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput {...register('user_email')} placeholder="Email" autoComplete="username" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4">
                          Send OTP
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer/>
    </div>
  )
}

export default ForgetPassword
