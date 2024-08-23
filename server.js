const express = require("express");
const cors = require('cors');
const path = require("path");
const expressWinston = require('express-winston')
require("dotenv").config();
const { sequelize } = require('./models');
const logger = require('./logger/winstonLog');


const accountRoutes = require('./routes/accountRoutes');
const quizRoutes = require ('./routes/quizRoutes');
const quizEventRoutes = require ('./routes/quizEventRoutes');
const EventRoutes = require ('./routes/EventRoutes')


const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))


const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;

const dir = path.join(__dirname, 'public', 'images', 'games');
app.use('/public/images/games', express.static(dir));

app.use("/login", require("./routes/authRoutes"));
// Use the routes
app.use('/account', accountRoutes);
app.use('/quiz',quizRoutes);
app.use('/quizEvent', quizEventRoutes);
app.use('/event', EventRoutes);
app.use('/game', require("./routes/gameRoutes.js"));


// Handling error
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;

    //Log the error by using winston
    logger.error(`${error.status} - ${error.message}`)
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal server error"
    })
})




app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log('Database Connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

