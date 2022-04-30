require('dotenv').config()

const database = {
    db: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
        dialectOptions: {
            encrypt: true,
        },
    },
    test: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'test',
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
        dialectOptions: {
            encrypt: true,
        },
    },
}

module.exports = process.env.NODE_ENV !== 'test' ? database.db : database.test
