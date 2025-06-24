import React from 'react'
import { useNavigate } from 'react-router-dom'
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
import { cilUser, cilLockLocked } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { Error, success } from '../layout/PopUp'

const ChangePassword = () => {
  const { register, handleSubmit } = useForm()
  const redirect = useNavigate()

  const onSubmit = async (data) => {
    if (data.new_pass !== data.confirm_pass) {
      Error('Passwords do not match!')
      return
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/changePassword`, data)
      if (res.data.success) {
        success(res.data.message)
          setTimeout(() => redirect('/login'),2000); 
      } else {
        Error(res.data.message)
      }
    } catch (err) {
      console.error(err)
      Error('Something went wrong.')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1>Change Password</h1>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput {...register('otpNo')} placeholder="Enter OTP" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        {...register('new_pass')}
                        placeholder="New Password"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        {...register('confirm_pass')}
                        placeholder="Confirm Password"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Change Password
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
      <ToastContainer />
    </div>
  )
}

export default ChangePassword
