var twit = require('twit');
var fs = require('fs');
var config = require('./twitter_api_tokens');
const getFormattedDate = require('../utils/getFormattedDate');
const round = require("../utils/round");

class twitterBot {

    constructor() {
        this.twitterModule = new twit(config);
    }

    tweetMedia(mediaPath, tweetText) {
        var mediaEncoded = fs.readFileSync(mediaPath, { encoding: 'base64' })

        this.twitterModule.post('media/upload', { media_data: mediaEncoded }, (err, data, response) => {
            var mediaIdStr = data.media_id_string
            var meta_params = { media_id: mediaIdStr }

            this.twitterModule.post('media/metadata/create', meta_params, (err, data, response) => {
                if (!err) {
                    var params = { status: tweetText, media_ids: [mediaIdStr] }
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

        var tweetText = `😷 Statistiques coronavirus 😷\r\n\r\n` +
            "⚬ Nombre total de cas : " + data.covid_stats.total_cases + (data.covid_stats.new_cases === null ? "(Pas de nouvelles données sur le nombre de nouveaux cas)" : " (" + data.covid_stats.new_cases + ")") + "\r\n" +
            "⚬ Décès : " + data.covid_stats.total_deaths + (data.covid_stats.new_deaths === null ? "(Pas de nouvelles données sur le nombre de nouveaux décès)" : " (" + data.covid_stats.new_deaths + ")");

        var params = {
            status: tweetText
        }

        // Tweet the covid text
        this.twitterModule.post('statuses/update', params, (err, apiData, response) => {
            // Reply to the tweet with the date of the data if the covid text has been tweeted
            if (response.statusCode === 200) {
                this.replyToTweet(`Données du : ${date}`, apiData.id_str);
            }
        });
    }

    tweetVaccinationsText(data) {
        var date = new Date();
        date.setDate(date.getDate() - 2);
        date = getFormattedDate(date);


        var tweetText = `💉 Statistiques vaccinations 💉\r\n\r\n` +
            "⚬ Nombre total de doses administrées : " + data.vaccinations_stats.total_vaccinations + " (+" + data.vaccinations_stats.total_vaccinations_increase + ")\r\n" +
            "⚬ Nombre de personnes complètement vaccinées : " + data.vaccinations_stats.people_fully_vaccinated + " (+" + data.vaccinations_stats.people_fully_vaccinated_increase + ")\r\n" +
            "⚬ Pourcentage de la population complètement vaccinée : " + round((data.vaccinations_stats.people_fully_vaccinated / 11000000) * 100, 2) + "%";

        var params = {
            status: tweetText
        }

        // Tweet the vaccinations text
        this.twitterModule.post('statuses/update', params, (err, apiData, response) => {
            // Reply to the tweet with the date of the data if the vaccinations text has been tweeted
            if (response.statusCode === 200) {
                this.replyToTweet(`Données du : ${date}`, apiData.id_str);
            }
        });
    }

    tweetDaysSinceFirstContainment() {
        var containmentDate = new Date("03/17/2020");
        var todayDate = new Date();

        var differenceInMilliseconds = todayDate.getTime() - containmentDate.getTime();
        var differenceInDays = Math.round(differenceInMilliseconds / (1000 * 3600 * 24));

        var params = {
            status: "Il y a " + differenceInDays + " jours, la Belgique entrait dans son tout premier confinement."
        }

        // Tweet the number of days elapsed since containment in Belgium
        this.twitterModule.post('statuses/update', params, (err, apiData, response) => console.log(response));
    }

    replyToTweet(replyText, tweetID) {
        this.twitterModule.post(
            'statuses/update',
            {
                status: replyText,
                in_reply_to_status_id: tweetID
            },
            function (err, apiData, response) { console.log(apiData) }
        )
    }

}


module.exports = twitterBot;
