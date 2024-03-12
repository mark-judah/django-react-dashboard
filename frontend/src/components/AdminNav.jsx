import React from "react";

import Logout from "../assets/logout.svg"

const AdminNav = () => {
    const logout = () => {
        localStorage.clear()
        window.location.replace('http://127.0.0.1:3000/');
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <p className="text-xl m-2 font-bold text-[#5A1E00]">BC Inc</p>
                    <div className="flex flex-col space-y-1">
                        <p className="text-xl font-semibold text-[#5A1E00]">Dashboard</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3 mr-5" onClick={logout}>
                    <img src={Logout} alt="" className="w-4" />
                    <button className="text-[#9F3400]">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default AdminNav;