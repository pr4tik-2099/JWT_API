import React, { useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import { Button } from '../components/ui/button';

const HomePage = () => {
    let token = sessionStorage.getItem('token');
    let uname = sessionStorage.getItem('username');
    const [name,setname] = useState(uname);
    //let decodeToken = jwtDecode(token);
    //console.log(decodeToken);

    useEffect(()=>{
        fetch('https://localhost:44380/api/Auth/Auth-point',{headers:{
            'Authorization':'bearer '+token
        }}).then((res)=>{
            console.log(res);
            return res.json();
        }).then((resp)=>{
             console.log(resp.data)
        })
    })

    const Logout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        window.location.reload();
    }
    return (
    <>
    <main className="container mx-auto mt-10 p-4">
        <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Welcome {name} My HomePage
            </h1>
            <p className="text-xl text-gray-500 mb-6">
                Tailwind CSS is a utility-first framework for building responsive designs.
            </p>
            <Button onClick={Logout} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
                Get Started
            </Button>
        </div>
    </main>
    </>
  )
}

export default HomePage