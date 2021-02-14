require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;


class DatabaseManager {



    constructor() {
        this.database_uri = `mongodb+srv://Alexandre:${process.env.MONGODB_PASSWORD}@cluster0.h4zyz.mongodb.net/belgium-covid-tracker?retryWrites=true&w=majority`;
        this.databaseClient = new MongoClient(this.database_uri, { useNewUrlParser: true });
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
        try {
            await this.databaseClient.connect();
            const database = this.selectDatabase(databaseName);
            const collection = this.selectCollection(database, collectionName);
            const insertFeedBack = await collection.insertOne(value);
            console.log(insertFeedBack);
        } catch (err) {
            console.log(err.stack);
        }
    }

}

module.exports = DatabaseManager;