const QuickChart = require('quickchart-js');
const fs = require('fs');
const request = require('request');
const getFormattedDate = require('../utils/getFormattedDate');

class Charts {

    constructor() {
        this.chart = new QuickChart();
        this.chartSize = { height: 418, width: 800 }
    }

    create(labelChart, height, width, statistics) {
        this.setDataGraph(labelChart, statistics);
        this.setSize(height, width);
    }

    setDataGraph(labelChart, statistics) {
        var dates = [];
        var data = [];
        statistics.forEach(statistic => {
            dates.push(statistic.date);
            data.push(statistic.data);
        })

        this.chart.setConfig({
            type: 'bar',
            data: {
                labels: dates,
                datasets: [
                    { type: 'bar', fill: false, label: labelChart, data: data }
                ]
            }
        });
    }

    setSize() {
        this.chart.setWidth(this.chartSize.width);
        this.chart.setHeight(this.chartSize.height);
    }

    async download() {
        var date = getFormattedDate(new Date());
        Promise.resolve(this.chart.toFile(`../chart_${date}.png`));
    }

}

module.exports = Charts;