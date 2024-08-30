const express = require("express");
const cors = require('cors');
const path = require("path");
const expressWinston = require('express-winston')
require("dotenv").config();
const { sequelize } = require('./models');
const logger = require('./logger/winstonLog');
const passport = require("passport");
const session = require("express-session");
var bodyParser = require('body-parser')


const accountRoutes = require('./routes/accountRoutes');
const userRoutes = require('./routes/userRoutes.js');
const brandRoutes = require('./routes/brandRoutes');
const quizRoutes = require ('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes.js');
const EventRoutes = require ('./routes/EventRoutes')

const voucherRoutes = require ('./routes/voucherRoutes.js');

const app = express();

// initalize sequelize with session store
const SessionStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SessionStore({
  db: sequelize,
});


//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

app.use(
    session({
      secret: "keyboard cat",
      store: sessionStore,
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24 * 30,
      },
    })
);

/*-----------Passport Authentication-----------*/
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;

const dir = path.join(__dirname, 'public', 'images', 'games');
app.use('/public/images/games', express.static(dir));



// Use the routes
app.use("/login", require("./routes/authRoutes"));
app.use('/account', accountRoutes);
app.use('/user', userRoutes);
app.use('/brand', brandRoutes);
app.use('/quiz',quizRoutes);
app.use('/questions', questionRoutes);
app.use('/event', EventRoutes);
app.use('/game', require("./routes/gameRoutes.js"));
app.use('/voucher', voucherRoutes);


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

