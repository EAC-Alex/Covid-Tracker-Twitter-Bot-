require('dotenv').config({ path: __dirname + '/./../.env' })
const MongoClient = require('mongodb').MongoClient;


class DBconnection {

    constructor() {
        this.database_uri = `mongodb+srv://Alexandre:${process.env.MONGODB_PASSWORD}@cluster0.h4zyz.mongodb.net/belgium-covid-tracker?retryWrites=true&w=majority`;
        this.databaseClient = new MongoClient(this.database_uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    selectDB(databaseName) {
        const database = this.databaseClient.db(databaseName);
        return database;
    }

    selectCollection(database, collectionName) {
        const collection = database.collection(collectionName);
        return collection;
    }

    async insert(databaseName, collectionName, data) {
        this.databaseClient.connect(async () => {
            try {
                const database = this.selectDatabase(databaseName);
                const collection = this.selectCollection(database, collectionName);
                const insertFeedBack = await collection.insertOne(data);
                console.log(insertFeedBack);
            } catch (err) {
                console.log(err.stack);
            }
            this.databaseClient.close();
        })
    }

    getWeekDocuments() {
        var todayDate = new Date();
        todayDate.setHours(todayDate.getHours() + 1); // Date UTC + 1 (Belgium Time Zone)
        var lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);
        lastWeekDate.setHours(lastWeekDate.getHours() + 1); // Date UTC + 1 (Belgium Time Zone)
        var weekDocuments = this.databaseManager.getDocuments("belgium-covid-tracker", "statistics", lastWeekDate, todayDate)
        return weekDocuments;
    }

    getDocuments(databaseName, collectionName, dateStart, dateEnd) {
        return new Promise((resolve, reject) => {
            this.databaseClient.connect(async () => {
                try {
                    // Set dates to UTC + 1 (Belgium Time Zone)
                    dateStart.setHours(dateStart.getHours() + 1);
                    dateEnd.setHours(dateEnd.getHours() + 1);

                    const database = this.selectDB(databaseName);
                    const collection = this.selectCollection(database, collectionName);

                    var documents = await collection.find({
                        "date": {
                            '$gte': dateStart,
                            '$lt': dateEnd
                        }
                    }).toArray();
                    resolve(documents);

                } catch (err) {
                    console.log(err.stack);
                }
                this.databaseClient.close();
            })
        })
    }

}

module.exports = DBconnection;