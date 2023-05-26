import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { addPreference_Url } from '../apisSheet'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Preference(props) {

 const navigate = useNavigate()
 const [loading, setLoading] = useState(false)

 const [state, setState] = useState({
  sources: '',
  category: '',
  authors: ''
 })

 useEffect(() => {
  setState(prev => ({
   ...prev,
   sources: props.preferenceData.sources,
   category: props.preferenceData.category,
   authors: props.preferenceData.authors
  }))

 }, [props.preferenceData])

 // const [error, setError] = useState({
 //  sources: false,
 //  category: false,
 //  authors: false,

 // })


 const handleInput = (e) => {
  const { name, value } = e.target
  setState(pre => ({
   ...pre,
   [name]: value
  }))
 }


 const handleSubmit = () => {
  setLoading(false)
  const details = {
   sources: state.sources,
   category: state.category,
   authors: state.authors,
  }
  const requestOptions = {
   method: "POST",
   headers: {
    "content-type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem("token")}`
   },
   url: `${addPreference_Url}`,
   data: details
  }

  axios(requestOptions).then(res => {
   const data = res.data
   props.setIsOpen(false)
   setLoading(false)
  }).catch(err => {
   const status = err.response.status
   if (status === 401) {
    navigate('/')
   }
   setLoading(false)
  })
 }


 return (
  <div className='container-fluid'>
   <div className=''>
    <div class="text-center mt-4 name h5">
     Preference
    </div>
    <div className="p-3 my-3">
     <div className='mb-4'>
      <div className="form-field d-flex align-items-center">
       <input className='form-control' type="text" name="sources" value={state.sources} id="sources" placeholder="Sources" onChange={handleInput} autoComplete='new-password' />
      </div>
      {/* {
       error.sources && <div className='h6 text-danger ps-2 fs-12'>{error.sources}</div>
      } */}
     </div>
     <div className='mb-4'>
      <div className="form-field d-flex align-items-center">
       <input className='form-control' type="category" name="category" value={state.category} id="category" placeholder="Category" onChange={handleInput} autoComplete='new-password' />
      </div>
      {/* {
       error.category && <div className='h6 text-danger ps-2 fs-12'>{error.category}</div>
      } */}
     </div>
     <div className='mb-4'>
      <div className="form-field d-flex align-items-center">
       <input className='form-control' type="authors" name="authors" value={state.authors} id="pwd" placeholder="authors" onChange={handleInput} autoComplete='new-password' />
      </div>
      {/* {
       error.authors && <div className='h6 text-danger ps-2 fs-12'>{error.authors}</div>
      } */}
     </div>
     <button className="btn mt-3 btn-primary form-control" type='submit' onClick={!loading && handleSubmit}>{loading ? "Loading..." : 'Add Preference'}</button>
     {
      loading && <div> <Spinner /></div>
     }
    </div>
   </div>
  </div>
 )
}

export default Preference