//Setting up express framework and dependencies used.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('./config/logger');
const cors = require('cors');
const config = require('./config/config.js');

const UserRoute = require('./routes/users.js');
const LicensesRoute = require('./routes/licenses.js');

//setting up the route and other requirements
app.use(cors());
app.use(express.json());
app.use("/api/users", UserRoute);
app.use("/api/licenses", LicensesRoute);


//connecting the mongodb database
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(process.env.PORT || config.port, () => {
        logger.info(`Listening at port ${config.port}`);
    });
});


