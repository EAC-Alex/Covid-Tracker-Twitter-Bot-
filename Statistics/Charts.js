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

    create(labelChart, dataChart) {
        this.chart.setConfig({
            type: 'bar',
            data: {
                labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                datasets: [
                    { type: 'line', fill: false, label: labelChart, data: dataChart }
                ]
            }
        });

        this.setSize();
    }
}

module.exports = Charts;