import React from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

const Chart = props => {

    const jsonData = [
        {
            'seriesname': 2016,
            'data': [
                {
                    'label': 1,
                    'value': 1000
                },
                {
                    'label': 2,
                    'value': 2000
                }

            ]
        },
        {
            'seriesname': 2017,
            'data': [
                {
                    'label': 1,
                    'value': 1300
                },
                {
                    'label': 2,
                    'value': 2300
                }

            ]
        },
        {
            'seriesname': 2018,
            'data': [
                {
                    'label': 1,
                    'value': 1401
                },
                {
                    'label': 2,
                    'value': 2401
                }

            ]
        },
        {
            'seriesname': 2019,
            'data': [
                {
                    'label': 1,
                    'value': 1500
                },
                {
                    'label': 2,
                    'value': 2500
                }
            ]
        }
    ]

    const source = {
        'chart': {
            'caption': 'ShopRite Sales',
            'subCaption': 'By Week',
            'yAxisName': 'Sales',
            'formatnumberscale': '4',
            'theme': 'fusion',
            'plottooltext': '$$dataValue in sales during $label in $seriesName'
        },
        'categories': [
            {
                'category': [
                    {
                        'label': 'Week 1'
                    },
                    {
                        'label': 'Week 2'
                    }
                ]
            }
        ],
        'dataset': jsonData
    }

    const chartConfigs = {
        type: 'msline',
        width: 800,
        height: 800,
        dataFormat: 'json',
        dataSource: source
    }

    console.log(props.jsonData)

    return (
        <ReactFC {...chartConfigs} />
    )
}

export default Chart