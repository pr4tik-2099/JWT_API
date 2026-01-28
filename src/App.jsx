import {Router,Route,BrowserRouter,Routes} from 'react-router-dom'
import './App.css'
import Login from '../src/pages/Login'
import {Button} from '@/components/ui/button'
import {Link} from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  

  return (
   <>
    <Link to='/' className='mr-50'>Home</Link>
    <Link to='/login' className='mr-10 font-semibold text-xl text-green-400 hover:text-cyan-400'>Login</Link>
    <Link to='/register' className='ml-5 font-semibold text-xl text-green-400 hover:text-cyan-400'>Register</Link>
    <Outlet />
   </>
  )
}

export default App
