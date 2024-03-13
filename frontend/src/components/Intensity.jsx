import React, { useEffect, useState } from "react";

import axios from "axios";
import ReactApexChart from "react-apexcharts";

const Intensity = (props) => {
    let [intensity, setIntensity] = useState([]);
    let data = []
    let options = {}
    useEffect(() => {
        if (props.data) {
            setIntensity(props.data);
        } else {
            axios.get('http://localhost:8000/api/v1/dash/get-intensity')
                .then(response => {
                    setIntensity(response.data)
                }).catch(error => {
                    console.log(error)
                })
        }
    }, [props.data]);
    data = intensity
    if (data.length > 0) {
        options = {
            chart: {
                height: 350,
                type: 'heatmap',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    radius: 0,
                    useFillColorAsStroke: true,
                    colorScale: {
                        ranges: [{
                            from: -30,
                            to: 5,
                            name: 'low',
                            color: '#FFBE9F'
                        },
                        {
                            from: 6,
                            to: 20,
                            name: 'medium',
                            color: '#FF935F'
                        },
                        {
                            from: 21,
                            to: 45,
                            name: 'high',
                            color: '#DE4800'
                        },
                        {
                            from: 46,
                            to: 100,
                            name: 'extreme',
                            color: '#9F3400'
                        }
                        ]
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 1
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    return '<div class="text-wrap p-3 mt-2">' +
                        '<span class="text-red-400">' + 'Intensity: ' + series[seriesIndex][dataPointIndex] + '</span>' +
                        '<br>' +
                        '<span>' + data[seriesIndex].title[dataPointIndex] + '</span>'
                        + '<br>' +
                        '<span>' + data[seriesIndex].year[dataPointIndex] + '</span>' +
                        '</div>'
                }
            }
        }
    }
    return (
        <div>
            <div>
                <div id="chart">
                    <ReactApexChart options={options} series={data} type="heatmap" height={350} width={1450} />
                </div>
                <div id="html-dist"></div>
            </div>

        </div>
    );

}
export default Intensity;