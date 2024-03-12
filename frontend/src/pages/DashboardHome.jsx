import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../assets/filter.svg"
import PersonIcon from "../assets/person.svg"
import Source from "../assets/news.png"
import Country from "../assets/country.png"
import Region from "../assets/region.png"
import Year from "../assets/year.png"
import AdminNav from "../components/AdminNav";
import Topics from "../components/Topics";
import SourcesRadar from "../components/SourcesRadar";
import Intensity from "../components/Intensity";
import Countries from "../components/Countries";
import Regions from "../components/Regions";
import Sectors from "../components/Sectors";
import Years from "../components/Years";
import Pestle from "../components/Pestle";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const DashboardHome = () => {
    let coverage_data = []
    let [quickStats, setQuickStats] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/dash/get-quick-stats')
            .then(response => {
                setQuickStats(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, [])

    Object.entries(quickStats).forEach(([key, value]) => {
        coverage_data.push(key);
        coverage_data.push(value);

    });
    return (
        <div>
            <div className="divide-y">
                <AdminNav />

                <div className="flex space-x-10 divide-x">
                    <div className="h-screen">
                        <div className="flex items-center space-x-2 p-2">
                            <img src={PersonIcon} alt="" className="w-8 rounded-full" />
                            <p className="text-sm font-semibold text-[#5A1E00]">Admin</p>
                        </div>

                    </div>

                    <div className="w-full">
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

                        <div className="flex justify-start items-start m-8 space-x-14">
                            <div className="flex flex-col">
                                <div className="w-fit">
                                    <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col mb-1">
                                                <p className="text-amber-950 text-sm">Topics</p>
                                                <p className="text-amber-950 text-xs">Top 10</p>
                                            </div>
                                            <Popup trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="right center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                        </div>
                                        <Topics />
                                    </div>
                                </div>
                            </div>

                            <div className="w-fit">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Average Likelihood and Relevance.</p>
                                            <p className="text-amber-950 text-xs">Top 10 sources</p>
                                        </div>
                                         <Popup trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="left center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                    </div>
                                    <SourcesRadar />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start items-start m-8">
                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Sectors</p>
                                            <p className="text-amber-950 text-xs">Top 10</p>
                                        </div>
                                         <Popup trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="right center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                    </div>
                                    <Sectors />
                                </div>
                            </div>

                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Years</p>
                                        </div>
                                         <Popup trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="right center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                    </div>
                                    <Years />
                                </div>
                            </div>

                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Pestle</p>
                                        </div>
                                         <Popup trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="left center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                    </div>
                                    <Pestle />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-start items-start m-8 space-x-14">
                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Articles per Country</p>
                                        </div>
                                         <Popup trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="right center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                    </div>
                                    <Countries />
                                </div>
                            </div>

                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Articles per Region</p>
                                        </div>
                                         <Popup trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="left center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                    </div>
                                    <Regions />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Intensity</p>
                                        </div>
                                         <Popup trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="left center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                    </div>
                                    <Intensity />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default DashboardHome;