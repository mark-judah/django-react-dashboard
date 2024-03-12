import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Topics = () => {
    let [topics, setTopics] = useState([]);
    let top_ten={}


    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/dash/get-topics')
            .then(response => {
                setTopics(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, [])

    var str = JSON.stringify(topics);
    console.log(str)
    str = str.replace('"":', '"unknown":');
    topics=JSON.parse(str);


    top_ten=Object.fromEntries(
        Object.entries(topics).slice(0, 10)
      );
    
    console.log(top_ten)


    const data = {
        labels: Object.keys(top_ten),
        datasets: [
            {
                label: 'Occurences',
                backgroundColor: 'rgb(90,30,0)',
                borderRadius:5,
                data: Object.values(top_ten)
            }
        ]
    };

    return (
        <div className="w-full">
            <Bar data={data}
                style={{
                    width:700,
                    height:300
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

export default Topics;