import React, { useEffect, useState } from "react";
import Source from "../assets/news.png"
import Country from "../assets/country.png"
import Region from "../assets/region.png"
import Year from "../assets/year.png"
import axios from "axios";

const QuickStats = () => {
    let coverage_data = []
    let [quickStats, setQuickStats] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/dash/get-quick-stats')
            .then(response => {
                setQuickStats(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, [])

    Object.entries(quickStats).forEach(([key, value]) => {
        coverage_data.push(key);
        coverage_data.push(value);

    });

    return (
        <div className="flex justify-start items-start m-8 space-x-14">
            <div className="flex justify-center items-center space-x-24">
                <div className="w-80">
                    <div className=" p-5 rounded-md border border-[#DFDDE1]">
                        <div className="p-2 bg-[#FEBF9F] rounded-md w-14">
                            <img src={Year} alt="" className="w-14" />
                        </div>
                        <p className="text-amber-950 mt-3 text-xl text-wrap">Most covered year</p>
                        <p className="text-amber-950 mt-3 text-sm text-wrap">{coverage_data[0]}</p>
                        <p className="text-[#FF681F] text-sm">{coverage_data[1]} Articles</p>

                    </div>
                </div>

                <div className="w-80">
                    <div className=" p-5 rounded-md border border-[#DFDDE1]">
                        <div className="p-2 bg-[#FEBF9F] rounded-md w-14">
                            <img src={Source} alt="" className="w-14" />
                        </div>
                        <p className="text-amber-950 mt-3 text-xl text-wrap">Most used source</p>
                        <p className="text-amber-950 mt-3 text-sm text-wrap">{coverage_data[2]}</p>
                        <p className="text-[#FF681F] text-sm">{coverage_data[3]} Articles</p>

                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center space-x-24">

                <div className="w-80">
                    <div className=" p-5 rounded-md border border-[#DFDDE1]">
                        <div className="p-2 bg-[#FEBF9F] rounded-md w-14">
                            <img src={Country} alt="" className="14" />
                        </div>
                        <p className="text-amber-950 mt-3 text-xl text-wrap">Most covered country</p>
                        <p className="text-amber-950 mt-3 text-sm text-wrap">{coverage_data[4]}</p>
                        <p className="text-[#FF681F] text-sm">{coverage_data[5]} Articles</p>

                    </div>
                </div>

                <div className="w-80">
                    <div className=" p-5 rounded-md border border-[#DFDDE1]">
                        <div className="p-2 bg-[#FEBF9F] rounded-md w-14">
                            <img src={Region} alt="" className="w-14" />
                        </div>
                        <p className="text-amber-950 mt-3 text-xl text-wrap">Most covered region</p>
                        <p className="text-amber-950 mt-3 text-sm text-wrap">{coverage_data[6]}</p>
                        <p className="text-[#FF681F] text-sm">{coverage_data[7]} Articles</p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickStats;