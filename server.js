const express = require("express");
const cors = require('cors');
const path = require("path");
const { sequelize } = require('./models');
const accountRoutes = require('./routes/accountRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


require("dotenv").config();

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;

const dir = path.join(__dirname, 'public');

app.use(express.static(dir));

app.use("/login", require("./routes/authRoutes"));
// Use the account routes
app.use('/account', accountRoutes);

const event = require('./event');

app.get("/quiz", (req, res) => {
    res.json({
        event: event.id,
        port: SOCKET_PORT
    });
})



app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database Connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

