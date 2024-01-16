import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import BaseLayout from '../../components/layout/BaseLayout';
import CustomInput from '../../components/customInput/CustomInput';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createAdminAction } from '../../redux/auth/userAction';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';

function Register() {
  const inputFields = [
    {
      label: "First Name *",
      name: "fName",
      type: "text",
      placeholder: "Sam",
      required: true
    },
    {
      label: "Last Name *",
      name: "lName",
      type: "text",
      placeholder: "Bahadur",
      required: true
    },
    {
      label: "Email *",
      name: "email",
      type: "email",
      placeholder: "abc@abc.com",
      required: true
    },
    {
      label: "Phone No",
      name: "phone",
      type: "number",
      placeholder: "46578932"
    },
    {
      label: "Password *",
      name: "password",
      type: "password",
      placeholder: "*******",
      required: true,
      minLength: 6
    },
    {
      label: "Confirm Password *",
      name: "confirmPassword",
      type: "password",
      placeholder: "*******",
      required: true,
      minLength: 6
    }
  ]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "admin"
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleOnSubmit = (e) => {
    // Prevent page from refreshing
    e.preventDefault();

    // Validation on form data
    // Password and confirmPass Matches
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Password should match");
      return;
    }
    dispatch(createAdminAction(formData, navigate))
  }

  return (
    <AdminLayout title={"Register"}>
      <div>
        <Form onSubmit={handleOnSubmit} className='login-form mt-3 mb-3 border p-4 rounded shadow-lg'>
          {inputFields.map(field => {
            return <CustomInput key={field.label} {...field} onChange={handleOnChange} />
          })}

          <Button variant="primary" type="submit" >
            Register
          </Button>
        </Form>


      </div>
    </AdminLayout>
  )
}

export default Register;
