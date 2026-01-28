import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

export const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, getMessage] = useState("");
    const navigate = useNavigate();

    // const addUser = async() => {
    //     console.log("hello");
    //     let response = await fetch('https://localhost:44380/api/Auth/register',{
    //         method:'Post',
    //         body:JSON.stringify({userName,password}) 
    //     });
    //     response = await response.json();
    //     console.log(response);
    //     Navigate('/login')
    // }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (userName == "" || password == "") {
            console.log("form is empty");
        }
        else {
            
            try {
                const res = await axios.post("https://localhost:44380/api/Auth/register",
                    { userName, password }
                ).then((res) => {
                    console.log(res);
                    sessionStorage.setItem('username',userName);
                    return res.json();
                    
                })
                alert("success");
                navigate("/login");
            }
            catch (err) {
                console.log("Invalid username or password", err);
            }
        }
       

    }
    return (

        <>
            <div className='mt-24 w-full flex items-center justify-center'>
                <form onSubmit={handleLogin} className='border-2 p-15 rounded-2xl'>
                    <h1 className='font-extrabold text-3xl mb-20 text-purple-600 -mt-2.5 underline'>REGISTER</h1>
                    <div className='w-80'>
                        <Label htmlFor='Username' className='mb-1 ml-1 text-0.5lg'>User Name</Label>
                        <Input
                            id='Username'
                            type='text' className=''
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)} />
                    </div>
                    <div className='w-80'>
                        <Label htmlFor='Password' className='mt-8 mb-1 ml-1 text-0.5lg'>Password</Label>
                        <Input
                            id='Password'
                            type='text'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <Button type='submit' variant='outline' className='mt-20 text-green-400 font-semibold text-lg' size='lg'>Submit</Button>
                    </div>
                </form>
            </div>
        </>
    )
}
