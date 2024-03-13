import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SourcesRadar = (props) => {
    let [results, setResults] = useState([]);
    let top_ten = {}


    useEffect(() => {
        if (props.data) {
            console.log("props has data")
            setResults(props.data);
        } else {
            console.log("props empty")
            axios.get('http://localhost:8000/api/v1/dash/get-likelihood-relevance-sources')
                .then(response => {
                    setResults(response.data)

                }).catch(error => {
                    console.log(error)
                })
        }
    }, [props.data]);


    top_ten = Object.fromEntries(
        Object.entries(results).slice(0, 10)
    );

    let sources = []
    let average_likelihood = []
    let average_relevance = []

    Object.entries(top_ten).map(([key, value]) => (
        sources.push(value.source),
        average_likelihood.push(value.average_likelihood),
        average_relevance.push(value.average_relevance)

    ))

    const data = {
        labels: sources,
        datasets: [{
            label: 'Relevance',
            data: average_relevance,
            fill: true,
            backgroundColor: 'rgb(90,30,0)',
            borderColor: 'rgb(90,30,0)',
            pointBackgroundColor: 'rgb(90,30,0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(90,30,0)'
        }, {
            label: 'Likelihood',
            data: average_likelihood,
            fill: true,
            backgroundColor: 'rgb(254,191,159)',
            borderColor: 'rgb(254,191,159)',
            pointBackgroundColor: 'rgb(254,191,159)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(254,191,159)'
        }]
    };


    return (
        <div className="w-full">
            <Radar data={data}
                style={{
                    width: 700,
                    height: 300
                }}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true
                        }
                    },

                }}
            />
        </div>


    );
}

export default SourcesRadar;