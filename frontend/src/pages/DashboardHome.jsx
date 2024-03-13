import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../assets/filter.svg"
import PersonIcon from "../assets/person.svg"
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
import QuickStats from "../components/QuickStats";
const DashboardHome = () => {

    const [values, setValues] = useState([]);
    let [filterTopics, setFilterTopics] = useState();
    let [filterLikelyhoodRelevance, setFilterLikelyhoodRelevance] = useState();
    let [filterIntensity, setFilterIntensity] = useState();
    let [filterCountries, setFilterCountries] = useState();
    let [filterRegions, setFilterRegions] = useState();
    let [filterYears, setFilterYears] = useState();
    let [filterSectors, setFilterSectors] = useState();
    let [filterPestle, setFilterPestle] = useState();

    let filters = ['end_year', 'topic', 'sector', 'region', 'pestle', 'source', 'country']
    const [checkedState, setCheckedState] = useState(
        new Array(filters.length).fill(false)
    );
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        console.log(updatedCheckedState)
    }

    let [allData, setAllData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/dash/get-all')
            .then(response => {
                setAllData(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, [])

    console.log(allData)
    const options = [
        "2016",
        "oil",
        "Energy",
        "OPEC",
        "Redux",
    ];
    const handleChange = (e, filter) => {
        setValues({ ...values, [filter]: e.target.value });
        console.log(values)
    };

    const applyFilters = (url) => {
        let data = {
            filters: values
        };
        console.log(url)
        axios.post(`http://127.0.0.1:8000/api/v1/dash/${url}`, data)
            .then(response => {
                switch (url) {
                    case 'get-topics':
                        setFilterTopics(response.data)
                        break;
                    case 'get-likelihood-relevance-sources':
                        setFilterLikelyhoodRelevance(response.data)
                        break;
                    case 'get-intensity':
                        setFilterIntensity(response.data)
                        break;
                    case 'get-countries':
                        setFilterCountries(response.data)
                        break;
                    case 'get-regions':
                        setFilterRegions(response.data)
                        break;
                    case 'get-years':
                        setFilterYears(response.data)
                        break;
                    case 'get-sectors':
                        setFilterSectors(response.data)
                        break;
                    case 'get-pestle':
                        setFilterPestle(response.data)
                        break;
                }
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })

    }


    const FilterPopup = (props) => {
        return (
            <div>
                <p className="text-[#9F3400]">Select filters to apply</p>
                {filters.map((item, index) => {
                    return (
                        <div className="text-[#802300]">
                            <div className="p-3">
                                <input
                                    type="checkbox"
                                    id={`custom-checkbox-${item}`}
                                    name={item}
                                    value={item}
                                    checked={checkedState[index]}
                                    onChange={() => handleOnChange(index)}
                                />
                                <label className="p-2" htmlFor={`custom-checkbox-${item}`}>{item}</label>
                            </div>
                            {checkedState[index] ? (
                                <select value={values[item]} onChange={(e) => handleChange(e, item)}
                                    className="p-2 rounded-xl">
                                    {allData[item].map((option, index) => {
                                        return (
                                            <option key={index}>
                                                {option}
                                            </option>
                                        );
                                    })}
                                </select>
                            ) : null}

                        </div>
                    );
                })}
                <div className="flex justify-center p-5">
                    <button onClick={() => applyFilters(props.url)} className="bg-[#5A1E00] p-2 text-white rounded-xl text-sm">Apply Filter(s)</button>
                </div>
            </div>
        )
    }
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
                        <QuickStats />

                        <div className="flex justify-start items-start m-8 space-x-14">
                            <div className="flex flex-col">
                                <div className="w-fit">
                                    <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col mb-1">
                                                <p className="text-amber-950 text-sm">Topics</p>
                                                <p className="text-amber-950 text-xs">Top 10</p>
                                            </div>
                                            <Popup className="w-200" trigger={
                                                <img src={Filter} alt="" className="w-4" />
                                            } position="right center">
                                                <FilterPopup url='get-topics' />
                                            </Popup>
                                        </div>
                                        <Topics data={filterTopics} />
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
                                        <Popup className="w-200" trigger={
                                            <img src={Filter} alt="" className="w-4" />
                                        } position="left center">
                                            <FilterPopup url='get-likelihood-relevance-sources' />
                                        </Popup>
                                    </div>
                                    <SourcesRadar data={filterLikelyhoodRelevance} />
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
                                        <Popup className="w-200" trigger={
                                            <img src={Filter} alt="" className="w-4" />
                                        } position="right center">
                                            <FilterPopup url='get-sectors' />
                                        </Popup>
                                    </div>
                                    <Sectors data={filterSectors} />
                                </div>
                            </div>

                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Years</p>
                                        </div>
                                        <Popup className="w-200" trigger={
                                            <img src={Filter} alt="" className="w-4" />
                                        } position="right center">
                                            <FilterPopup url='get-years' />
                                        </Popup>
                                    </div>
                                    <Years data={filterYears} />
                                </div>
                            </div>

                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Pestle</p>
                                        </div>
                                        <Popup className="w-200" trigger={
                                            <img src={Filter} alt="" className="w-4" />
                                        } position="left center">
                                            <FilterPopup url='get-pestle' />
                                        </Popup>
                                    </div>
                                    <Pestle data={filterPestle} />
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
                                        <Popup className="w-200" trigger={
                                            <img src={Filter} alt="" className="w-4" />
                                        } position="right center">
                                            <FilterPopup url='get-countries' />
                                        </Popup>
                                    </div>
                                    <Countries data={filterCountries} />
                                </div>
                            </div>

                            <div className="w-fit m-4">
                                <div className=" p-5 rounded-md border border-[#DFDDE1] flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-amber-950 text-sm">Articles per Region</p>
                                        </div>
                                        <Popup className="w-200" trigger={
                                            <img src={Filter} alt="" className="w-4" />
                                        } position="left center">
                                            <FilterPopup url='get-regions' />
                                        </Popup>
                                    </div>
                                    <Regions data={filterRegions} />
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
                                        <Popup className="w-200" trigger={
                                            <img src={Filter} alt="" className="w-4" />
                                        } position="left center">
                                            <FilterPopup url='get-intensity' />
                                        </Popup>
                                    </div>
                                    <Intensity data={filterIntensity} />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div >

        </div >
    );
}

export default DashboardHome;