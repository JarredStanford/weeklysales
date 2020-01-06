import React from 'react';
import * as FlexmonsterReact from 'react-flexmonster/hooks';

function PivotTableHooks(props) {


    const jsonData = [
        {
            "week": 1,
            "2016": 1000,
            "2017": 1300,
            "2018": 1401,
            "2019": 1500
        },
        {
            "week": 2,
            "2016": 2000,
            "2017": 2300,
            "2018": 2401,
            "2019": 2500
        }
    ]

    const format = {
        dataSource: {
            data: jsonData
        },
        formats: [
            {
                name: '',
                thousandsSeparator: ',',
                decimalPlaces: 2,
                currencySymbol: '$'
            }
        ],
        slice: {
            rows: [
                { uniqueName: "week" }
            ],
            columns: [
                { uniqueName: "[Measures]" }
            ],
            measures: [
                {
                    uniqueName: "2016",
                    aggregation: "sum",
                },
                {
                    uniqueName: "2017",
                    aggregation: "sum",
                },
                {
                    uniqueName: "2018",
                    aggregation: "sum",
                },
                {
                    uniqueName: "2019",
                    aggregation: "sum",
                },
            ]
        },
        options: {
            showAggregationLabels: false
        }
    }

    return (
        <div className="App">
            <FlexmonsterReact.Pivot toolbar={true} width="100%"
                report={format}
            />
        </div>
    )
}

export default PivotTableHooks;