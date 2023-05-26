import React, { useState } from 'react';
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import { register_Url } from '../apisSheet';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';


const Signup = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        userName: '',
        email: '',
        password: '',
        confirm_pwd: ''
    })
    const [error, setError] = useState({
        userName: false,
        email: false,
        password: false,
        confirm_pwd: false

    })


    const handleInput = (e) => {
        const { name, value } = e.target

        setState(pre => ({
            ...pre,
            [name]: value
        }))


        switch (name) {
            case "userName":
                if (value === '') {
                    error['userName'] = "Required"
                } else {
                    error['userName'] = false
                }
                break;

            case "email":
                if (value === '') {
                    error['email'] = 'Required'
                } else {
                    error['email'] = false
                }
                break;

            case "password":
                if (value === '') {
                    error['password'] = 'Required'
                } else {
                    error['password'] = false
                }
                break;

            case "confirm_pwd":
                if (value === '') {
                    error['confirm_pwd'] = "Required"
                } else if (value !== state.password) {
                    error['confirm_pwd'] = "password and confirm password not matched"
                } else {
                    error['confirm_pwd'] = false
                }
                break
            default: break
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (state.userName === '') {
            setError(prev => ({
                ...prev,
                userName: 'Required'
            }))
        }
        if (state.email === '') {
            setError(prev => ({
                ...prev,
                email: 'Required'
            }))
        }
        if (state.password === '') {
            setError(prev => ({
                ...prev,
                password: 'Required'
            }))
        }
        if (state.confirm_pwd === '') {
            setError(prev => ({
                ...prev,
                confirm_pwd: 'Required'
            }))
        }

        if (state.userName !== '' &&
            state.email !== '' &&
            state.password !== '' &&
            state.confirm_pwd !== '' &&
            state.password === state.confirm_pwd) {

            const details = {
                name: state.userName,
                email: state.email,
                password: state.password,
                confirm_password: state.confirm_pwd
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                url: `${register_Url}`,
                data: details
            }


            axios(requestOptions).then(res => {
                const data = res.data
                localStorage.setItem('token', data.authorisation.token)
                navigate('/home')
                setLoading(false)
            }).catch(err => {
                const status = err.response.status
                const response = err.response.data.error
                if (status === 422) {
                    response.error_message.forEach(e => {
                        if (e.name === 'email') {
                            error['email'] = e.message
                        }
                        if (e.name === 'password') {
                            error['password'] = e.message
                        }
                        if (e.name === 'userName') {
                            error['userName'] = e.message
                        }
                    });
                }
                // if (status === 401) {
                //     error['email'] = 'user not found'
                // }
                setLoading(false)
            })

        } else {
            setLoading(false)
        }
    }
    return (
        <React.Fragment>
            <div className='container-fluid'>
                <div className='login'>
                    <div class="text-center mt-4 name">
                        Signup
                    </div>
                    <div className="p-3 mt-3">
                        <div className='mb-4'>
                            <div className="form-field d-flex align-items-center">
                                <FontAwesomeIcon icon={faUser} className='fas' />
                                <input type="text" name="userName" value={state.userName} id="userName" placeholder="Username" onChange={handleInput} autoComplete='new-password' />
                            </div>
                            {
                                error.userName && <div className='h6 text-danger ps-2 fs-12'>{error.userName}</div>
                            }
                        </div>
                        <div className='mb-4'>
                            <div className="form-field d-flex align-items-center">
                                <FontAwesomeIcon icon={faEnvelope} className='fas' />
                                <input type="email" name="email" value={state.email} id="email" placeholder="Email" onChange={handleInput} autoComplete='new-password' />
                            </div>
                            {
                                error.email && <div className='h6 text-danger ps-2 fs-12'>{error.email}</div>
                            }
                        </div>
                        <div className='mb-4'>
                            <div className="form-field d-flex align-items-center">
                                <FontAwesomeIcon icon={faKey} className='fas' />
                                <input type="password" name="password" value={state.password} id="pwd" placeholder="Password" onChange={handleInput} autoComplete='new-password' />
                            </div>
                            {
                                error.password && <div className='h6 text-danger ps-2 fs-12'>{error.password}</div>
                            }
                        </div>
                        <div className='mb-4'>
                            <div className="form-field d-flex align-items-center">
                                <FontAwesomeIcon icon={faKey} className='fas' />
                                <input type="password" name="confirm_pwd" value={state.confirm_pwd} id="confirm_pwd" placeholder="Confirm Password" onChange={handleInput} autoComplete='new-password' />
                            </div>
                            {
                                error.confirm_pwd && <div className='h6 text-danger ps-2 fs-12'>{error.confirm_pwd}</div>
                            }
                        </div>
                        <button className="btn mt-3" type='submit' onClick={!loading && handleSubmit}>{loading ? 'Loading...' : 'Signup'}</button>
                        {
                            loading && <div> <Spinner /></div>
                        }
                    </div>
                    <div className="text-center fs-6">
                        <span className='account-text'>Already Registered? </span><Link to='/'>Login up Here</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup;