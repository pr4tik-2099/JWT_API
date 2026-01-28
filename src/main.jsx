import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route,BrowserRouter,Routes,Router,RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Login from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import HomePage from './pages/HomePage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Route>
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
