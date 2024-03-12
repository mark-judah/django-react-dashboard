import React from "react";
import LoginBanner from "../assets/data.svg"
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = (data) => {
        let loginCreds = {
            email: data.email,
            password: data.password
        }
        axios.post('http://127.0.0.1:8000/api/v1/auth/login', loginCreds)
            .then((response) => {
                console.log(response.data)
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
                }else{
                    console.log(error)
                }
            })
    }
    return (
        <div>
            <div ><Toaster/></div>
            <div className="flex justify-between items-center divide-x text-amber-950">
                <div className="flex w-3/5 items-center justify-center h-screen">
                    <img src={LoginBanner} alt="" className="w-96" />

                </div>

                <div className="flex flex-col w-2/5 items-center justify-center h-screen">
                    <div>
                        <div>
                            <p className="text-xl ">Welcome to your dashboard </p>
                            <p className="text-sm">Please sign in to view your data </p>

                        </div>

                        <div className="my-4 bg-[#9F3400] rounded-md p-3 text-white">
                            <p className="text-sm">Admin Email: admin@demo.com / Pass: admin</p>
                        </div>

                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm mb-1 font-light">Email</label>
                                    <input type="email" className="border-gray-500 border rounded-md" {...register("email", { required: true })} />
                                    {errors.email && <span>This field is required</span>}

                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="text-sm mb-1 font-light">Password</label>
                                    <input type="password" className="border-gray-500 border rounded-md" {...register("password", { required: true })} />
                                    {errors.password && <span>This field is required</span>}

                                </div>

                                <div className="flex justify-center rounded-md p-1 bg-[#9F3400] text-white ">
                                    <button type="submit" className="text-sm">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;