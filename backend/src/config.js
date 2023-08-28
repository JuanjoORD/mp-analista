const { config } = require('dotenv');
config();

module.exports = {
    port: process.env.PORT || 3300,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASS,
    dbHost: process.env.DB_HOST
}
