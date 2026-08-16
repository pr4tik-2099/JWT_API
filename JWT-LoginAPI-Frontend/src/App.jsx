import { Router, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Login from '../src/pages/Login'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom'

function App() {
  //debugger;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the JWT token exists in sessionStorage
    const token = sessionStorage.getItem('token'); // Replace 'token' with your actual key name
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Clear token on logout
     sessionStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login page after logout
    window.location.reload(); // Optionally reload the page to reflect changes
  };

  console.log("isLoggedIn:", isLoggedIn);

  return (
    //  <>
    //   <Link to='/' className='mr-50'>Home</Link>
    //   <Link to='/login' className='mr-10 font-semibold text-xl text-green-400 hover:text-cyan-400'>Login</Link>
    //   <Link to='/register' className='ml-5 font-semibold text-xl text-green-400 hover:text-cyan-400'>Register</Link>
    //   <Outlet />
    //  </>

    <>
      {/* <Link to="/" className="mr-50 text-lg text-cyan-500">
      <img src="../src/assets/library.png" alt='logo' className='w-10'/>
      </Link>

      {!isLoggedIn ? (
        <>
          <Link to="/login" className="mr-10 font-semibold text-xl text-green-400 hover:text-cyan-400">
            Login
          </Link>
          <Link to="/register" className="ml-5 font-semibold text-xl text-green-400 hover:text-cyan-400">
            Register
          </Link>
        </>
      ) : (

        <>
         <Button variant='ghost' className="mr-10 font-semibold text-lg text-green-400 hover:text-cyan-400">
          <Link to="/UserDetails">User Details</Link>
         </Button>

         <button 
          onClick={handleLogout} 
          className="ml-5 font-semibold text-xl text-red-400 hover:text-red-600"
        >
          Logout
        </button>
        </>
       
      )}

      <Outlet /> */}

      <nav className="flex items-center justify-between px-6 py-5 text-white shadow-md">
        <Link to="/" className="flex items-center gap-3">
          <img src="../src/assets/library.png" alt="logo" className="w-10 h-10 object-contain" />
        </Link>

        <div className="flex items-center gap-4">

          {!isLoggedIn ? (

            <>
              <Link to="/login" className="mx-5 font-semibold text-lg text-green-400 hover:text-cyan-400 transition-colors">
                Login
              </Link>
              <Link to="/register" className="mx-5 font-semibold text-lg text-green-400 hover:text-cyan-400 transition-colors">
                Register
              </Link>
            </>

          ) : (

            <>
              <Link to="/UserDetails" className="font-semibold text-lg mx-5 text-green-400 hover:text-cyan-400 transition-colors">
                Users
              </Link>
              <button
                onClick={handleLogout}
                className="font-semibold text-lg text-red-500 mx-5 hover:text-red-400 transition-colors"
              >
                Logout
              </button>

            </>

          )}

        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default App
