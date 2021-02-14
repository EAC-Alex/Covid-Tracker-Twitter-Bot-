const QuickChart = require('quickchart-js');

class ChartManager {

    chartSize = { width: 800, height: 600 }

    constructor() {
        this.chart = new QuickChart();
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
    }

    setSizeChart() {
        this.chart.setWidth(this.chartSize.width);
        this.chart.setHeight(this.chartSize.height);
    }

    getChartUrl() {
        return this.chart.getUrl();
    }
}

module.exports = ChartManager;