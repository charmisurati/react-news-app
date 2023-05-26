import React, { useState } from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { login_Url } from '../apisSheet';
import { Spinner } from 'react-bootstrap';


const Login = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({
        email: false,
        password: false
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setState(pre => ({
            ...pre,
            [name]: value
        }))

        switch (name) {
            case "email":
                if (value === '') {
                    error['email'] = 'Required'
                } else {
                    error['email'] = false
                }
                break;

            case "password":
                if (value === '') {
                    error['password'] = "Required"
                } else {
                    error['password'] = false
                }
            default: break
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
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

        if (state.email !== '' && state.password !== '') {
            const details = {
                email: state.email,
                password: state.password
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                url: `${login_Url}`,
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
                    });
                }
                if (status === 401) {
                    error['email'] = 'user not found'
                }
                setLoading(false)
            })
        }
    }

    return (
        <React.Fragment>
            <div className='container-fluid'>
                <div className='login'>
                    <div class="text-center mt-4 name">
                        Login
                    </div>
                    <div className="p-3 mt-3">
                        <div className='mb-4'>
                            <div className="form-field d-flex align-items-center">
                                <FontAwesomeIcon icon={faUser} className='fas' />
                                <input type="text" name="email" id="email" value={state.email} placeholder="email" autoComplete='new-password' onChange={handleInput} />
                            </div>
                            {
                                error.email && <div className='h6 text-danger ps-2 fs-12'>{error.email}</div>
                            }
                        </div>
                        <div className='mb-4'>
                            <div className="form-field d-flex align-items-center">
                                <FontAwesomeIcon icon={faKey} className='fas' />
                                <input type="password" name="password" id="pwd" value={state.password} placeholder="Password" autoComplete='new-password' onChange={handleInput} />
                            </div>
                            {
                                error.password && <div className='h6 text-danger ps-2 fs-12'>{error.password}</div>
                            }
                        </div>
                        <button type="submit" className="btn mt-3" onClick={!loading && handleSubmit}>{loading ? 'Loading...' : 'Login'}</button>
                        {
                            loading && <div> <Spinner /></div>
                        }
                    </div>
                    <div className="text-center fs-6">
                        <span className='account-text'>Don't Have An Account? </span><Link to="/signup">Sign up Here</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;