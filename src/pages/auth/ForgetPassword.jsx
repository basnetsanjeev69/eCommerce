import React, { useState } from 'react'
import BaseLayout from '../../components/layout/BaseLayout'
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../components/customInput/CustomInput';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPasswordAction } from '../../redux/auth/userAction';

function ForgetPassword() {
    const inputFields = [
        {
            label: "Email *",
            name: "email",
            type: "email",
            placeholder: "abc@abc.com",
            required: true
        }
    ]

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
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
        //  Firebase call for rest password
        const { email } = formData;
        dispatch(resetPasswordAction(email))
    }
    return (
        <BaseLayout>
            <div>
                <Form onSubmit={handleOnSubmit} className='login-form mt-3 mb-3 border p-4 rounded shadow-lg'>
                    {inputFields.map(field => {
                        return <CustomInput key={field.label} {...field} onChange={handleOnChange} />
                    })}

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <div>
                        <Link to="/login">Go to login</Link>
                    </div>
                </Form>

            </div>
        </BaseLayout>
    )
}

export default ForgetPassword;
