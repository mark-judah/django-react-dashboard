import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Years = (props) => {
    let [years, setYears] = useState([]);
    let labels = []
    let values = []

    useEffect(() => {
        if (props.data) {
            setYears(props.data);
        } else {
            axios.get('http://localhost:8000/api/v1/dash/get-years')
                .then(response => {
                    setYears(response.data)
                }).catch(error => {
                    console.log(error)
                })
        }
    }, [props.data]);

    var str = JSON.stringify(years);
    str = str.replace('"":', '"unknown":');
    years = JSON.parse(str);

    Object.entries(years).forEach(([key, value]) => {
        labels.push(key);
        values.push(value);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Articles published',
            data: values,
            fill: false,
            borderColor: 'rgb(90,30,0)',
            tension: 0.1
        }]
    };

    return (
        <div className="w-full h-96">
            <Line data={data}
                style={{
                    width: 500,
                }}


            />
        </div>


    );
}

export default Years;