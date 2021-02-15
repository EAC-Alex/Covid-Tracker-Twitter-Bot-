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

    tweetText(values) {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        date = getFormattedDate(date);
        console.log(date)
        var params = {
            status: (
                "Nombre total de cas : " + values.totalCases + " (" + values.newCases + ")\r\n" +
                "Décès : " + values.totalDeaths + " (" + values.newDeaths + ")\r\n\r\n" +
                "--- Données du " + date + " ---"
            )
        }
        this.twitterModule.post('statuses/update', params, function (err, data, response) { console.log(data) });
    }
}


module.exports = twitterBot;
