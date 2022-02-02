import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { setAdmin, setUser } from "../redux/adminSlice"
import { useDispatch } from 'react-redux';

const SignIn = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const initialState = {
        email: '',
        password: '',
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
    
    const signIn = () => {
        let { email, password } = formValues
        const signUpData = { email, password }
        fetch((process.env.PORT || "http://localhost:5000") + "/users/signin" , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpData),
        }).then(res => {
            if (res.status === 209) {
                history.push("/")
                dispatch(setAdmin())
            }
            else if (res.status === 200) {
                history.push("/")
                dispatch(setUser())
            }
            else if (res.status === 422) {
                window.alert("Wrong Password")
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
    
        // Check if there are no errors
        if (Object.keys(errors).length === 0) signIn()
        return errors
    }

    return (
        <section id="form" className='auth min-h-screen p-10 flex flex-col items-center justify-center'>
            <div>
                <span className='lg:text-4xl md:text-2xl sm:text-xl text-xl'>Sign In Form</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="form-errors">{}</h1>
                <form className="text-2xl pt-16" method="post" onSubmit={handleSubmit} name="form">
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
                    >Sign in</button>
                </form>
                <p className="mt-5 text-2xl">Dont have an Account? <span><a className="text-orange-600" href="/">Sign Up</a></span></p>
            </div>
        </section>
    )
}

export default SignIn