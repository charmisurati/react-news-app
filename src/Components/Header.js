import React, { useState } from 'react'
import '../App.css';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { getPreference_Url, logout_Url } from '../apisSheet';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import Preference from '../Pages/Preference';

const Header = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [preferenceData, setPreferenceData] = useState({})

    const handleLogout = () => {
        setShow(false)

        const requestOptions = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            url: `${logout_Url}`
        }
        axios(requestOptions).then(res => {
            localStorage.removeItem('token')
            navigate('/')
        }).catch(err => {
            localStorage.removeItem('token')
            const status = err.response.status
            if (status === 401) {
                navigate('/')
            }
        })
    }

    const handleOpenPreference = () => {

        const requestOptions = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            url: `${getPreference_Url}`,
        }

        axios(requestOptions).then(res => {
            const data = res.data
            console.log("data", data);
            if (!!data.preferecne) {
                setPreferenceData(data.preferecne)
            } else {
                setPreferenceData({})
            }
            setIsOpen(true)

        }).catch(err => {
            const status = err.response.status
            if (status === 401) {
                navigate('/')
            }
        })
    }


    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NEWS</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse custom-nav" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/home'}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'#'}>About Us</NavLink>
                            </li>
                            <li className="nav-item" onClick={handleOpenPreference}>
                                <NavLink className="nav-link" to={'#'}>Preference</NavLink>
                            </li>
                            <li className="nav-item" onClick={() => setShow(true)}>
                                <NavLink className="nav-link" to={'#'}>Logout</NavLink>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" fdprocessedid="9rp23w">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>are you sure, you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>are you sure, you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer> */}
                <Preference preferenceData={preferenceData} setIsOpen={setIsOpen} />
            </Modal>

        </React.Fragment>
    )
}

export default Header;