const express = require('express');
const cors = require("cors");

const config = require('./config');
const apiRouter = require('./routes/api')

const app = express();
app.use(cors())
app.options('*', cors())

// settings
app.set('port', config.port);

//middleware
app.use(express.json());

app.use("/api", apiRouter);

app.use('/*', ( req, res ) => {
    res.send('Dummie response')
})


module.exports = {
    app
}

