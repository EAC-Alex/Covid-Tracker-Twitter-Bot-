const QuickChart = require('quickchart-js');
const fs = require('fs');
const request = require('request');
const getFormattedDate = require('./utils/getFormattedDate');

class ChartManager {

    constructor() {
        this.chart = new QuickChart();
        this.chartSize = { width: 800, height: 418 }
    }

    setSizeChart() {
        this.chart.setWidth(this.chartSize.width);
        this.chart.setHeight(this.chartSize.height);
    }

    getChartUrl() {
        return this.chart.getUrl();
    }

    async downloadChart() {
        var date = getFormattedDate();
        Promise.resolve(this.chart.toFile(`chart_${date}.png`));
    }

    createChart() {
        this.chart.setConfig({
            type: 'bar',
            data: {
                labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                datasets: [
                    { type: 'line', fill: false, label: 'Nouveaux cas recensés', data: [100, 400, 200, 400, 700] }
                ]
            }
        });

        this.setSizeChart();
    }
}

module.exports = ChartManager;