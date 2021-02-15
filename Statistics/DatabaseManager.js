require('dotenv').config({ path: __dirname + '/./../.env' })
const MongoClient = require('mongodb').MongoClient;


class DatabaseManager {

    constructor() {
        this.database_uri = `mongodb+srv://Alexandre:${process.env.MONGODB_PASSWORD}@cluster0.h4zyz.mongodb.net/belgium-covid-tracker?retryWrites=true&w=majority`;
        this.databaseClient = new MongoClient(this.database_uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    selectDatabase(databaseName) {
        const database = this.databaseClient.db(databaseName);
        return database;
    }

    selectCollection(database, collectionName) {
        const collection = database.collection(collectionName);
        return collection;
    }

    async insertValue(databaseName, collectionName, value) {
        this.databaseClient.connect(async () => {
            try {
                const database = this.selectDatabase(databaseName);
                const collection = this.selectCollection(database, collectionName);
                const insertFeedBack = await collection.insertOne(value);
                console.log(insertFeedBack);
            } catch (err) {
                console.log(err.stack);
            }
            this.databaseClient.close();
        })
    }

    getAllDocumentsBetweenDates(databaseName, collectionName, dateStart, dateEnd) {
        return new Promise((resolve, reject) => {
            this.databaseClient.connect(async () => {
                try {
                    const database = this.selectDatabase(databaseName);
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

module.exports = DatabaseManager;