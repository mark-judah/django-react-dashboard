import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";


const Countries = () => {
  let [countries, setCountries] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/dash/get-countries')
      .then(response => {
        setCountries(response.data)
        // console.log(response.data)
      }).catch(error => {
        console.log(error)
      })

  }, [])

  var str = JSON.stringify(countries);
  console.log(str)
  str = str.replace('"":', '"unknown":');
  str = str.replace('United States of America', 'United States');

  countries = JSON.parse(str);
  let data = []
  let i = 0
  Object.entries(countries).forEach(
    ([key, value]) =>data.push([key, value]),
   
  );
  const options = {
    colorAxis: { colors: ["#FFBE9F", "#FF681F", "#9F3400"] },
    // backgroundColor: "#81d4fa",
    datalessRegionColor: "grey",
    defaultColor: "#f5f5f5",
  };
data[0]=["Country","Items"]
 console.log(data)
return (
  <Chart
    chartEvents={[
      {
        eventName: "select",
        callback: ({ chartWrapper }) => {
          const chart = chartWrapper.getChart();
          const selection = chart.getSelection();
          if (selection.length === 0) return;
          const region = data[selection[0].row + 1];
          console.log("Selected : " + region);
        },
      },
    ]}
    chartType="GeoChart"
    width="700px"
    height="350px"
    data={data}
    options={options}
  />
);
}

export default Countries;