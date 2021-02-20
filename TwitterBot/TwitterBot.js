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

    tweetText(data) {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        date = getFormattedDate(date);

        var tweetText = "Nombre total de cas : " + data.covid_stats.total_cases + " (" + data.covid_stats.new_cases + ")\r\n" +
                        "Décès : " + data.covid_stats.total_deaths + " (" + data.covid_stats.new_deaths + ")\r\n" +
                        ((data.vaccinations_stats === undefined)
                            ? "\r\n\r\n"
                            : "Nombre de personnes vaccinées : " + data.vaccinations_stats.people_vaccinated + " (+" + data.vaccinations_stats.people_vaccinated_increase + ")\r\n\r\n"
                        ) +
                        "--- Données du " + date + " ---";

        var params = { 
            status: tweetText
        }

        this.twitterModule.post('statuses/update', params, function (err, apiData, response) { console.log(apiData) });
    }
}


module.exports = twitterBot;
