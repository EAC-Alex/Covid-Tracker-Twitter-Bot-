const QuickChart = require('quickchart-js');
const fs = require('fs');
const request = require('request');
const getFormattedDate = require('../utils/getFormattedDate');

class Charts {

    constructor() {
        this.chart = new QuickChart();
        this.chartSize = { width: 800, height: 418 }
    }

    setSize() {
        this.chart.setWidth(this.chartSize.width);
        this.chart.setHeight(this.chartSize.height);
    }

    getUrl() {
        return this.chart.getUrl();
    }

    async download() {
        var date = getFormattedDate(new Date());
        Promise.resolve(this.chart.toFile(`../chart_${date}.png`));
    }

    create(labelChart, statistics) {
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

        this.setSize();
    }
}

module.exports = Charts;