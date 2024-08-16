const express = require("express");
const cors = require('cors');
const { sequelize } = require('./models');
const accountRoutes = require('./routes/accountRoutes');
const quizRoutes = require ('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Use the routes
app.use('/account', accountRoutes);
app.use('/quiz',quizRoutes);



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
