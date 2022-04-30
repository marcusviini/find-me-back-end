import mongoose from 'mongoose'

require('dotenv').config()

class Database {
    constructor() {
        this.mongo()
    }

    mongo() {
        this.mongoConnection = mongoose
            .connect(
                `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            )
            .then((connection) => {
                console.log('CONNECTED ON MONGODB')
            })
            .catch((err) => {
                console.log('ERROR CONNECTING TO MONGO')
            })
    }
}

export default new Database()
