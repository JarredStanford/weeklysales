import React, { useEffect } from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

import { Loader } from 'semantic-ui-react'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

const Chart = props => {

    const source = {
        'chart': {
            'caption': 'ShopRite Sales',
            'subCaption': 'By Week',
            'yAxisName': 'Sales',
            'formatnumberscale': '4',
            'theme': 'fusion',
            'plottooltext': '$$dataValue in sales during $label in $seriesName',
            'yAxisMinValue': '5000',
            'yAxisMaxValue': '17000',
            'numVisibleLabels': '10'
        },
        'categories': [
            {
                'category': [
                    {
                        'label': 'Week 1'
                    },
                    {
                        'label': 'Week 2'
                    },
                    {
                        'label': 'Week 3'
                    },
                    {
                        'label': 'Week 4'
                    },
                    {
                        'label': 'Week 5'
                    },
                    {
                        'label': 'Week 6'
                    },
                    {
                        'label': 'Week 7'
                    },
                    {
                        'label': 'Week 8'
                    },
                    {
                        'label': 'Week 9'
                    },
                    {
                        'label': 'Week 10'
                    },
                    {
                        'label': 'Week 11'
                    },
                    {
                        'label': 'Week 12'
                    },
                    {
                        'label': 'Week 13'
                    },
                    {
                        'label': 'Week 14'
                    },
                    {
                        'label': 'Week 15'
                    },
                    {
                        'label': 'Week 16'
                    },
                    {
                        'label': 'Week 17'
                    },
                    {
                        'label': 'Week 18'
                    },
                    {
                        'label': 'Week 19'
                    },
                    {
                        'label': 'Week 20'
                    },
                    {
                        'label': 'Week 21'
                    },
                    {
                        'label': 'Week 22'
                    },
                    {
                        'label': 'Week 23'
                    },
                    {
                        'label': 'Week 24'
                    },
                    {
                        'label': 'Week 25'
                    },
                    {
                        'label': 'Week 26'
                    },
                    {
                        'label': 'Week 27'
                    },
                    {
                        'label': 'Week 28'
                    },
                    {
                        'label': 'Week 29'
                    },
                    {
                        'label': 'Week 30'
                    },
                    {
                        'label': 'Week 31'
                    },
                    {
                        'label': 'Week 32'
                    },
                    {
                        'label': 'Week 33'
                    },
                    {
                        'label': 'Week 34'
                    },
                    {
                        'label': 'Week 35'
                    },
                    {
                        'label': 'Week 36'
                    },
                    {
                        'label': 'Week 37'
                    },
                    {
                        'label': 'Week 38'
                    },
                    {
                        'label': 'Week 39'
                    },
                    {
                        'label': 'Week 40'
                    },
                    {
                        'label': 'Week 41'
                    },
                    {
                        'label': 'Week 42'
                    },
                    {
                        'label': 'Week 43'
                    },
                    {
                        'label': 'Week 44'
                    },
                    {
                        'label': 'Week 45'
                    },
                    {
                        'label': 'Week 46'
                    },
                    {
                        'label': 'Week 47'
                    },
                    {
                        'label': 'Week 48'
                    },
                    {
                        'label': 'Week 49'
                    },
                    {
                        'label': 'Week 50'
                    },
                    {
                        'label': 'Week 51'
                    },
                    {
                        'label': 'Week 52'
                    }
                ]
            }
        ],
        'dataset': props.data
    }

    const chartConfigs = {
        type: 'msline',
        width: '90%',
        height: '500',
        dataFormat: 'json',
        dataSource: source
    }

    console.log(chartConfigs)

    if (!props.data) { return <Loader /> }

    return (
        <>
            <ReactFC {...chartConfigs} />
        </>
    )
}

export default Chart