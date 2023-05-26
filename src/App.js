import './App.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,

} from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import { useEffect } from 'react';
import Preference from './Pages/Preference';
import Header from './Components/Header';

function App() {

  const token = localStorage.getItem('token')
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.pathname);

  useEffect(() => {
    if (token !== null && (location.pathname === '/' || location.pathname === '/signup')) {
      navigate('/home')
    }
    if (token === null && (location.pathname === '/' || location.pathname === '/signup')) {
      navigate(location.pathnameiukj)
    }
  }, [location.pathname])
  return (
    <>
      {
        token === null ? <>
          <Routes>
            <Route exact path='/' element={<Login />}></Route>
            <Route exact path='/signup' element={<Signup />}></Route>
          </Routes>
        </> : <>
          <div className="container-scroller">
            <Header />
            <Routes>
              <Route exact path='/home' element={<Home />}></Route>
              {/* <Route exact path='/preference' element={<Preference />}></Route> */}
            </Routes>
          </div></>
      }

    </>
  );
}

export default App;
