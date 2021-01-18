var twit = require('twit');
var config = require('./twitter_api_tokens.js');

class twitterBot {
    constructor() {
        this.twitterModule = new twit(config);
    }

    tweet(values) {
        var text = "Nombre total de cas : " + values.totalCases + " (" + values.newCases + ")\r\n" +
                   "Décès : " + values.totalDeaths + " (" + values.newDeaths + ")\r\n";
                   text = "c";
        this.twitterModule.post('statuses/update', { status: text }, function(err, data, response) {console.log(data)});
    }
}


module.exports = twitterBot;