var twit = require('twit');
var fs = require('fs');
var config = require('./twitter_api_tokens.js');
const getFormattedDate = require('../utils/getFormattedDate');

class twitterBot {
    constructor() {
        this.twitterModule = new twit(config);
    }



    tweetMedia(mediaPath) {
        var mediaEncoded = fs.readFileSync(mediaPath, { encoding: 'base64' })

        this.twitterModule.post('media/upload', { media_data: mediaEncoded }, (err, data, response) => {
            var mediaIdStr = data.media_id_string
            var meta_params = { media_id: mediaIdStr }

            this.twitterModule.post('media/metadata/create', meta_params, (err, data, response) => {
                if (!err) {
                    var params = { status: 'Graphe sur les nouveau cas recensé cette semaine', media_ids: [mediaIdStr] }
                    this.twitterModule.post('statuses/update', params, (err, data, response) => {
                        console.log(data)
                    })
                }
            })
        })
    }

    tweetCovidText(data) {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        date = getFormattedDate(date);

        var tweetText = `😷 Statistiques vaccinations / ${date} 😷\r\n\r\n` +
                        "⚬ Nombre total de cas : " + data.covid_stats.total_cases + " (" + data.covid_stats.new_cases + ")\r\n" +
                        "⚬ Décès : " + data.covid_stats.total_deaths + " (" + data.covid_stats.new_deaths + ")";

        var params = { 
            status: tweetText
        }

        this.twitterModule.post('statuses/update', params, function (err, apiData, response) { console.log(apiData) });
    }

    tweetVaccinationsText(data) {
        var date = new Date();
        date.setDate(date.getDate() - 2);
        date = getFormattedDate(date);

        var tweetText = `💉 Statistiques vaccinations / ${date} 💉\r\n\r\n` +
                        "⚬ Nombre total de doses administrées : " + data.vaccinations_stats.total_vaccinations + " (+" + data.vaccinations_stats.total_vaccinations_increase + ")\r\n";
                        "⚬ Nombre de personnes complètement vaccinées : " + data.vaccinations_stats.people_fully_vaccinated + " (+" + data.vaccinations_stats.people_full_vaccinated_increase + ")\r\n";
                        "° Pourcentage de la population complètement vaccinée : " + ((data.vaccinations_stats.people_fully_vaccinated / 11000000) * 100);

        var params = { 
            status: tweetText
        }

        this.twitterModule.post('statuses/update', params, function (err, apiData, response) { console.log(apiData) });
    }
}


module.exports = twitterBot;
