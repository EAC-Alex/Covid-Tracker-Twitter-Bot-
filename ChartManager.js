const QuickChart = require('quickchart-js');
const fs = require('fs');
const request = require('request');

class ChartManager {

    constructor() {
        this.chart = new QuickChart();
        this.chartSize = { width: 800, height: 600 }
    }

    setSizeChart() {
        this.chart.setWidth(this.chartSize.width);
        this.chart.setHeight(this.chartSize.height);
    }

    getChartUrl() {
        return this.chart.getUrl();
    }

    downloadChart() {
        this.chart.toFile('chart.png');
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