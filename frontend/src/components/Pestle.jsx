import React, { useEffect, useState } from "react";
import axios from "axios";
import { Polar, PolarArea } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Pestle = (props) => {
    let [pestle, setPestle] = useState([]);
    let labels = []
    let values = []


    useEffect(() => {
        if (props.data) {
            setPestle(props.data);
        } else {
            axios.get('http://localhost:8000/api/v1/dash/get-pestle')
                .then(response => {
                    setPestle(response.data)
                }).catch(error => {
                    console.log(error)
                })
        }
    }, [props.data]);

    var str = JSON.stringify(pestle);
    str = str.replace('"":', '"unknown":');
    pestle = JSON.parse(str);

    Object.entries(pestle).forEach(([key, value]) => {
        labels.push(key);
        values.push(value);
    });

    const data = {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: [
                '#62310E',
                '#9A4D16',
                '#D2691E',
                '#E58B4B',
                '#EDAF82',
                '#9F3400',
                '#DE4800',
                '#FF681F',
                '#FF935F',
                '#FFBE9F'
            ]
        }]
    };
    return (
        <div className="w-full h-96">
            <PolarArea data={data}
                style={{
                    width: 700,
                }}


            />
        </div>

    );
}

export default Pestle;