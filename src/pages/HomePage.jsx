import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Button } from '../components/ui/button';
import axios from "axios";

const HomePage = () => {
    let token = sessionStorage.getItem('token');
    let uname = sessionStorage.getItem('username');
    const [name, setname] = useState(uname);
    const [studentdata, setstudentdata] = useState([]);
    //let decodeToken = jwtDecode(token);
    //console.log(decodeToken);

    // useEffect(() => {
    //     fetch('https://localhost:44380/api/Auth/Auth-point', {
    //         headers: {
    //             'Authorization': 'bearer ' + token
    //         }
    //     }).then((res) => {
    //         console.log(res.data);
    //         return res.json();
    //     }).then((resp) => {
    //         setstudentdata(resp.data);
    //         console.log(resp.data)
    //     })
    // }, []);

    useEffect(() => {

        axios.get("https://localhost:44380/api/Auth/Auth-point", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response);
                setstudentdata(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const Logout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <>
            <main className="min-h-[calc(100vh-4rem)] bg-slate-950 font-sans text-slate-100 antialiased">
                <div className="mx-auto flex min-h-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">

                    {/* Hero / Header Section */}
                    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
                        {/* Cyber Grid & Ambient Glow Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(52,211,153,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.08),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-size-[2rem_2rem]" />

                        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                            <div className="space-y-6">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs tracking-wider text-emerald-400">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    SYSTEM_DASHBOARD v1.0
                                </div>

                                {/* Heading */}
                                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                                    Welcome back,{" "}
                                    <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                                        {name}
                                    </span>
                                </h1>

                                <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                                    Admin telemetry loaded. Monitor operational metrics, query student data, and terminate active session protocols.
                                </p>

                                {/* Action Row */}
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <Button
                                        onClick={Logout}
                                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-emerald-400 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-950 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] focus:outline-none"
                                    >
                                        Logout Protocol
                                    </Button>

                                    <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2 font-mono text-xs text-slate-400">
                                        <span className="text-cyan-400">STATUS:</span>{" "}
                                        {studentdata.length
                                            ? `${studentdata.length} RECORDS_LOADED`
                                            : "FETCHING_DATA..."}
                                    </div>
                                </div>
                            </div>

                            {/* Telemetry Cards */}
                            <div className="space-y-3 rounded-xl border border-slate-800/80 bg-slate-950/70 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-900/40 p-3 mt-5">
                                    <div>
                                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Session Type</p>
                                        <p className="text-base font-semibold text-white">Admin Access</p>
                                    </div>
                                    <div className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-400">
                                        ENCRYPTED
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border border-slate-800/60 bg-slate-900/40 p-4 transition-colors hover:border-slate-700">
                                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Students</p>
                                        <p className="mt-1 text-3xl font-bold font-mono text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.2)]">
                                            {studentdata.length || 0}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border border-slate-800/60 bg-slate-900/40 p-4 transition-colors hover:border-slate-700">
                                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Role level</p>
                                        <p className="mt-1 text-2xl font-bold text-white">Admin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Student Data Section */}
                    <section>
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold tracking-tight text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.2)]">
                                    Student Records
                                </h2>
                                <span className="font-mono text-xs text-slate-500">
                                    TOTAL: {studentdata.length}
                                </span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {studentdata.length ? (
                                    studentdata.map((data, index) => (
                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                        >
                                            {/* Cyber accent line on hover */}
                                            <div className="absolute top-0 left-0 h-0.5 w-0 bg-linear-to-r from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />

                                            <div className="flex items-center justify-between gap-2">
                                                <p className="font-mono text-xs text-slate-400">
                                                    ID: <span className="text-cyan-400">#{data.rollNo}</span>
                                                </p>
                                                <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs text-emerald-300">
                                                    {data.marks} PTS
                                                </span>
                                            </div>

                                            <p className="mt-3 text-base font-semibold text-slate-100 group-hover:text-white">
                                                {data.name}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full rounded-xl border border-dashed border-slate-800 p-8 text-center font-mono text-xs text-slate-500">
                                        NO RECORDS FOUND
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                </div>
            </main>
            {/* <main className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
                <div className="mx-auto flex min-h-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_28%)]" />
                        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                            <div className="space-y-6">
                                <p className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200 shadow-sm shadow-cyan-500/10">JWT dashboard</p>
                                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl animate-text-glow">
                                    Welcome back, <span className="bg-linear-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">{name}</span>
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                    Your secure admin panel is ready. Monitor users, review student details, and logout with a single animated action.
                                </p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <Button onClick={Logout} className="inline-flex transform rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/60">
                                        Logout
                                    </Button>
                                    <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 shadow-lg shadow-slate-950/20">
                                        {studentdata.length ? `${studentdata.length} student records loaded` : 'Loading student data...'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 rounded-[1.75rem] bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 animate-slide-up">
                                <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-900/90 p-4">
                                    <div>
                                        <p className="text-sm text-slate-400">Active session</p>
                                        <p className="text-2xl font-semibold text-white">Admin access</p>
                                    </div>
                                    <div className="rounded-3xl bg-cyan-500/15 px-3 py-2 text-cyan-100">Secure</div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-5">
                                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Students</p>
                                        <p className="mt-3 text-4xl font-semibold text-white">{studentdata.length || 0}</p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-5">
                                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Role</p>
                                        <p className="mt-3 text-4xl font-semibold text-white">Admin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-4">
                        <div className="rounded-[2rem] border border-slate-700/60 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/40">
                            <h2 className="mb-4 text-2xl font-semibold text-white">Student details</h2>
                            <div className="grid gap-3">
                                {studentdata.length ? studentdata.map((data, index) => (
                                    <div key={index} className="group transform overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95">
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Roll {data.rollNo}</p>
                                            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-100">Marks {data.marks}</span>
                                        </div>
                                        <p className="mt-3 text-lg font-semibold text-white">{data.name}</p>
                                    </div>
                                )) : (
                                    <div className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6 text-slate-400">No student details available yet.</div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main> */}
        </>

    )
}

export default HomePage;