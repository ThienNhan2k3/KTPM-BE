const express = require("express");
const cors = require("cors");
const path = require("path");
const expressWinston = require("express-winston");
require("dotenv").config();
const { sequelize } = require("./models");
const logger = require("./logger/winstonLog");
const passport = require("passport");
const session = require("express-session");
var bodyParser = require("body-parser");
const { authenticate, isAdmin } = require("./middlewares/authentication.js");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
global.__io = io;

const accountRoutes = require("./routes/accountRoutes");
const userRoutes = require("./routes/userRoutes.js");
const brandRoutes = require("./routes/brandRoutes");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes.js");
const EventRoutes = require("./routes/EventRoutes");
const voucherRoutes = require("./routes/voucherRouters");

// initalize sequelize with session store
const SessionStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SessionStore({
  db: sequelize,
});

//Middleware
app.use(
  cors({
    //Allows session cookie from browser to pass through
    credentials: true,
    //Sets the allowed domain to the domain where the front end is hosted, this could be http://localhost:3000 or an actual url
    origin: process.env.FRONT_END_URL || "http://localhost:5173",
  })
);
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    //   proxy: true,
    saveUninitialized: true,
    httpOnly: true,
    cookie: {
      maxAge: 60000 * 60 * 24 * 30,
    },
    store: sessionStore,
  })
);

/*-----------Passport Authentication-----------*/
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;

const dir = path.join(__dirname, "public", "images", "games");
app.use("/public/images/games", express.static(dir));

// Use the routes

__io.on("connection", require("./services/socketService.js").connection);
app.use("/", require("./routes/authRoutes"));

app.use(authenticate)

app.use('/account', accountRoutes);
app.use('/user', userRoutes);
app.use('/brand', brandRoutes);
app.use('/quiz',quizRoutes);
app.use('/question', questionRoutes);
app.use('/event', EventRoutes);
app.use('/game', require("./routes/gameRoutes.js"));
app.use('/voucher', voucherRoutes);

app.post("/routes", (req, res, next) => {
    const path = req.body.path || "";
    console.log("path:::", path);
    if (req.user.type == null) {
        return res.json({
            code: 200,
            metadata: {
                login: true,
                permission: path.includes("/brand"),
                homePage: path.includes("/brand") ? "/brand" : "/admin"
            },
        })
    } else if (req.user.type == "Admin") {
        return res.json({
            code: 200,
            metadata:  {
                login: true,
                permission: path.includes("/admin"),
                homePage: path.includes("/brand") ? "/brand" : "/admin"
            }
        })
    }

    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({
            code: 200,
            metadate: "Logout successfully"
        });
    });
})


// Handling error
app.use((err, req, res, next) => {
  const error = new Error(err.stack);
  error.status = 404;

  //Log the error by using winston
  logger.error(`${error.status} - ${error.message}`);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || "Internal server error",
  });
});

server.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Database Connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
