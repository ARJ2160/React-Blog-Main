import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
const { v4: uuidv4 } = require('uuid');
var md5 = require('md5');

const Signup = () => {

    const history = useHistory()
    const initialState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }
    
    const [formValues, setFormValue] = useState(initialState)
    const [formErrors, setFormErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target
        setFormValue({ ...formValues, [name]: value })
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        setFormErrors(validate(formValues))
    }

    const signUp = () => {
        let { email, firstName, lastName, password } = formValues
        const userData = { _id: uuidv4(), email, firstName, lastName, password: md5(password), role: "user" }
        fetch((process.env.PORT || "http://localhost:5000") + "/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        }).then((res) => {
            console.log(res.data);
            if (res.status === 422) window.alert("User already exists")
            else if (res.status === 200) {
                history.push("/signin")
            }
        }).catch((err) => formErrors.push(err))
    }

    const validate = formValues => {

        const errors = {}
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!formValues.email) {
            errors.email = "Email is Required"
        }
        else if (!regex.test(formValues.email)) {
            errors.email = "Enter valid Email"
        }
        if (!formValues.password) {
            errors.password = "Password is Required"
        }
        if (!formValues.firstName) {
            errors.firstName = "First Name is Required"
        }
        if (!formValues.lastName) {
            errors.lastName = "Last Name is Required"
        }

        //Check if there are no errors proceed to sign up
        if (Object.keys(errors).length === 0) signUp() 
        return errors
    }
    
    return (
        <section id="form" className='auth min-h-screen p-10 flex flex-col items-center justify-center'>
            <div>
                <span className="lg:text-4xl md:text-2xl sm:text-xl text-xl">Sign Up Form</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl py-7">Hello {formValues.firstName}</h1>
                <h1 className="form-errors">{Object.keys(formErrors).value}</h1>
                <form className="text-2xl" method="post" onSubmit={handleSubmit} name="form">
                    <label htmlFor="email">First Name</label>
                    <div className="form-divs my-3">
                        <input
                            type="text"
                            className="p-1 text-black"
                            name="firstName"
                            placeholder="First Name"
                            values={formValues.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="form-errors text-red-600">{formErrors.firstName}</p>
                    <label htmlFor="email">Last Name</label>
                    <div className="form-divs my-3">
                        <input
                            type="text"
                            className="p-1 text-black"
                            name="lastName"
                            placeholder="Last Name"
                            values={formValues.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="form-errors text-red-600">{formErrors.lastName}</p>
                    <label htmlFor="email">Email</label>
                    <div className="form-divs my-3">
                        <input
                            type="text"
                            className="p-1 text-black"
                            name="email"
                            id = "email"
                            placeholder="Email"
                            values={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="form-errors text-red-600">{formErrors.email}</p>
                    <label htmlFor="password">Password</label>    
                    <div className="form-divs my-3">
                        <input
                            type="password"
                            className="p-1 text-black"
                            name="password"
                            id = "password"    
                            placeholder="Password"
                            values={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="form-errors text-red-600">{formErrors.password}</p>
                    <button
                        type="submit"
                        className="form-btn mt-5 bg-orange-600 rounded-full px-5 py-2 hover:scale-x-110 hover:scale-y-110 transition duration-300 ease-out text-black"
                    >Sign Up</button>
                </form>
                <p className="mt-5 text-2xl">Already have an Account? <span><a className="text-orange-600" href="/signin">Sign In</a></span></p>
            </div>
        </section>
    )
}

export default Signup