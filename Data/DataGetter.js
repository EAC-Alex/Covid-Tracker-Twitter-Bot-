var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class dataGetter {
    parsedData;

    constructor() { }

    httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    parseHttpRequest(rawHttpData) {
        // regex
        const regexLocateBelgium = /Belgium.*?<\/tr>/si;
        const regexLocateValues = />.*</g;

        // parse data
        var parsedDataBelgium = rawHttpData.match(regexLocateBelgium);
        var parsedDataValues = parsedDataBelgium[0].match(regexLocateValues);

        // format data
        for (var i = 0; i < parsedDataValues.length; i++) {
            // raw value : >123<
            parsedDataValues[i] = parsedDataValues[i].replace('<', '').replace('>', '');
            // formatted value : 123
        }

        // return data
        return parsedDataValues;
    }

    getData_totalCases() {
        return this.parsedData[1];
    }
    getData_newCases() {
        return this.parsedData[2];
    }
    getData_totalDeaths() {
        return this.parsedData[3];
    }
    getData_newDeaths() {
        return this.parsedData[4];
    }
    getData() {
        var data = {
            totalCases: this.getData_totalCases(),
            newCases: this.getData_newCases(),
            totalDeaths: this.getData_totalDeaths(),
            newDeaths: this.getData_newDeaths()
        }
        return data;
    }

    updateData() {
        var webRawData = this.httpGet('https://www.worldometers.info/coronavirus/')
        this.parsedData = this.parseHttpRequest(webRawData);
    }

}



module.exports = dataGetter;