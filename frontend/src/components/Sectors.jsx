import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Sectors = () => {
    let [sectors, setSectors] = useState([]);
    
    let top_ten={}

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/dash/get-sectors')
            .then(response => {
                setSectors(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, [])

    var str = JSON.stringify(sectors);
    console.log(str)
    str = str.replace('"":', '"unknown":');
    sectors=JSON.parse(str);

   

    top_ten=Object.fromEntries(
        Object.entries(sectors).slice(0, 10)
      );

    const data = {
        labels: Object.keys(top_ten),
        datasets: [{
          data: Object.values(top_ten),
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
          ],
        }]
        
      };

    return (
        <div className="w-full h-96">
            <Pie data={data}
                style={{
                    width:500,
                }}
            
                
            />
        </div>


    );
}

export default Sectors;