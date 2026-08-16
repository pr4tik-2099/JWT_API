import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
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
            getMessage("Please fill in both username and password.");
        }
        else {

            try {
                let res = await axios.post("https://localhost:44380/api/Auth/login",
                    { userName, password }
                ).then((res) => {
                    console.log(res);
                    sessionStorage.setItem('username', userName);
                    sessionStorage.setItem('token', res.data.token);
                })
                alert("success");
                navigate("/");
                window.location.reload();
            }
            catch (err) {
                getMessage("Invalid username or password");
                console.log("Invalid username or password", err);
            }
        }


    }
    return (

        <>
            {/* <div className='mt-24 w-full flex items-center justify-center'>
                <form onSubmit={handleLogin} className='border-2 p-15 rounded-2xl'>
                    <h1 className='font-extrabold text-3xl mb-20 text-purple-600 -mt-2.5 underline'>LOGIN</h1>
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
                            type='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className='text-red-500 mt-4'>{message}</div>
                    <div>
                        <Button type='submit' variant='outline' className='mt-20 text-green-400 font-semibold text-lg' size='lg'>Submit</Button>
                    </div>
                </form>
            </div> */}

            <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
                {/* subtle green glow behind card */}
                {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-lime-400/5 blur-3xl" />
                </div> */}

                <form
                    onSubmit={handleLogin}
                    className="relative w-full max-w-md rounded-2xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-950/40 backdrop-blur-sm sm:p-10"
                >
                    {/* header */}
                    <div className="mb-10 text-center">
                        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-emerald-400/70">
                            Welcome back
                        </p>
                        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">
                            LOGIN
                        </h1>
                    </div>

                    {/* username */}
                    <div className="mb-6 text-left">
                        <Label
                            htmlFor="Username"
                            className="mb-2 ml-1 block text-sm font-medium text-emerald-300/90"
                        >
                            User Name
                        </Label>
                        <Input
                            id="Username"
                            type="text"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            placeholder="Enter your username"
                            className="h-11 border-emerald-500/25 bg-zinc-950/80 text-emerald-100 placeholder:text-emerald-500/40 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/30"
                        />
                    </div>

                    {/* password */}
                    <div className="mb-2 text-left">
                        <Label
                            htmlFor="Password"
                            className="mb-2 ml-1 block text-sm font-medium text-emerald-200/90"
                        >
                            Password
                        </Label>
                        <Input
                            id="Password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            className="h-11 border-emerald-500/25 bg-zinc-950/80 text-emerald-100 placeholder:text-emerald-500/40 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/30"
                        />
                    </div>

                    {/* error message */}
                    {message && (
                        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-300">
                            {message}
                        </div>
                    )}

                    {/* submit */}
                    <Button
                        type="submit"
                        className="mt-8 h-12 w-full bg-emerald-400 text-base font-semibold text-zinc-950 transition hover:bg-cyan-400 focus-visible:ring-emerald-400/40"
                        size="lg"
                    >
                        Submit
                    </Button>

                    {/* optional footer link */}
                    <p className="mt-6 text-center text-sm text-emerald-400/60">
                        Don&apos;t have an account?{' '}
                        <a href="/register" className="font-medium text-emerald-500 underline-offset-4 hover:text-emerald-200 hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login;
