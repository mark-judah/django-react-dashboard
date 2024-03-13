import React, { useEffect, useState } from "react";
import LoginBanner from "../assets/data.svg"
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let [tables, setTables] = useState(0);
    let [loading, setLoading] = useState(false);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/dash/check-tables')
            .then(response => {
                setTables(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const seedDatabase = () => {
        setLoading(true);
        axios.post('http://127.0.0.1:8000/api/v1/dash/seed')
            .then((response) => {
                setLoading(false);
                toast.success(response.data); 
            }).catch(function (error) {
                setLoading(false);
                toast.error(error.message);
            });
    };
    

    const onSubmit = (data) => {
        let loginCreds = {
            email: data.email,
            password: data.password
        }
        axios.post('http://127.0.0.1:8000/api/v1/auth/login', loginCreds)
            .then((response) => {
                localStorage.setItem('user', {
                    token: response.data.token
                })
                window.location.replace('http://127.0.0.1:3000/');

            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error('The username or password is incorrect');
                        localStorage.clear()
                    } if (error.toJSON().message === 'Network Error') {
                        alert('no internet connection')
                    }
                } else {
                    console.log(error)
                }
            })
    }
    return (
        <div>
            <div ><Toaster /></div>
            {loading ?(
                 <div className="h-screen flex items-center justify-center absolute inset-0 z-10">
                 <ClipLoader
                     color="#802300"
                     loading={loading}
                     size={150}
                     aria-label="Loading Spinner"
                     data-testid="loader"
                 />
             </div>
            ):('')}
            <div className="flex justify-between items-center divide-x text-amber-950">
                <div className="flex w-3/5 items-center justify-center h-screen">
                    <img src={LoginBanner} alt="" className="" />

                </div>

                <div className="flex flex-col w-2/5 items-center justify-center h-screen">
                    <div>
                        <div>
                            <p className="text-4xl ">Welcome to your dashboard </p>
                            <p className="text-xl">Please sign in to view your data </p>

                        </div>

                        <div className="my-4 bg-[#9F3400] rounded-md p-3 text-white">
                            <p className="text-md">Admin Email: admin@demo.com / Pass: admin</p>
                        </div>

                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col mb-4">
                                    <label className="text-md mb-1 font-light">Email</label>
                                    <input type="email" className="border-gray-500 border rounded-md p-3" {...register("email", { required: true })} />
                                    {errors.email && <span>This field is required</span>}

                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="text-md mb-1 font-light">Password</label>
                                    <input type="password" className="border-gray-500 border rounded-md p-3" {...register("password", { required: true })} />
                                    {errors.password && <span>This field is required</span>}

                                </div>

                                <div className="flex justify-center rounded-md bg-[#9F3400] p-3 text-white ">
                                    <button type="submit" className="text-md">Login</button>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="mt-10 text-md font-bold">
                        {tables==1 ? (
                            ''
                        ) : (
                            <div>
                                <p className="p-2">The database is empty, run migrations then seed the data</p>
                                <div className="flex justify-center rounded-md bg-[#9F3400] p-3 text-white ">
                                    <button onClick={seedDatabase} className="text-md">Seed</button>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;