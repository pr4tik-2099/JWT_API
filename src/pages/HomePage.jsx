import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Button } from '../components/ui/button';

const HomePage = () => {
    let token = sessionStorage.getItem('token');
    let uname = sessionStorage.getItem('username');
    const [name, setname] = useState(uname);
    const [studentdata, setstudentdata] = useState([]);
    //let decodeToken = jwtDecode(token);
    //console.log(decodeToken);

    useEffect(() => {
        fetch('https://localhost:44380/api/Auth/Auth-point', {
            headers: {
                'Authorization': 'bearer ' + token
            }
        }).then((res) => {
            console.log(res);
            return res.json();
        }).then((resp) => {
            setstudentdata(resp.data);
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
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Welcome to {name} my HomePage
                    </h1>
                    <p className="text-xl text-gray-400 mb-6">
                        Tailwind CSS is a utility-first framework for building responsive designs.
                    </p>
                    <Button variant='outline' onClick={Logout} className="bg-green-500 hover:bg-blue-700 font-bold py-3 px-6 rounded-lg shadow-lg">
                        Logout
                    </Button>
                    <h2 className="text-7xl font-semibold mt-3.5 mb-4">Student Details</h2>

                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-white border-3 border-green-400 px-5 py-2 text-lg tracking-wider font-semibold uppercase">Roll No</th>
                                <th className="text-white border-3 border-green-400 px-5 py-2 text-lg tracking-wider font-semibold uppercase">Name</th>
                                <th className="text-white border-3 border-green-400 px-5 py-2 text-lg tracking-wider font-semibold uppercase">Marks</th>
                            </tr>
                        </thead>
                        <tbody className='text-white divide-y w-full'>
                            {studentdata?.map((data, index) => {
                                return (
                                    <tr className='hover:bg-gray-700 w-full hover:text-green-500' key={index}>
                                        <td className="px-4 py-3 border">{data.rollNo}</td>
                                        <td className="px-4 py-2 border">{data.name}</td>
                                        <td className="px-4 py-2 border">{data.marks}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>

                    </table>
                    {/* {studentdata.map((data,index)=>
             <div key={index} className="p-1 mt-2 border-2 border-green-500  rounded-lg shadow-md">
             
                <p className="text-gray-500">ID: {data.rollNo} Name:{data.name} Marks:{data.marks}</p>
            </div> 
        )} */}
                </div>
            </main>
        </>
    )
}

export default HomePage;