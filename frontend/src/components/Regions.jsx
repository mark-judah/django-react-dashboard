import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const Regions = () => {
    let [regions, setRegions] = useState([]);
    let labels = []
    let values = []
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/dash/get-regions')
            .then(response => {
                setRegions(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, [])

    let str = JSON.stringify(regions);
    console.log(str)
    str = str.replace('"":', '"unknown":');
    regions = JSON.parse(str);


    Object.entries(regions).forEach(([key, value]) => {
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
        <div className="w-full">
            <Line data={data}
                style={{
                    width: 700,
                    height: 350
                }}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                            grid: {
                              display: false,
                            },
                          },
                      },
                }}

            />
        </div>


    );

}
export default Regions;