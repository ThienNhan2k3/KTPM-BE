const express = require("express");
var cors = require('cors');
const { GameInfor } = require('./models')
const { sequelize, Account} = require('./models')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

require("dotenv").config();

const PORT = process.env.PORT || 5000;


app.post('/account',async(req,res) => {
    const {name, email, password, phone, status} = req.body;
    try {
        const account = await Account.create({name, email, password, phone, status});
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await sequelize.sync({force: true});
    console.log('Database Synced!');
})


app.get("/", (req, res) => {
    console.log(GameInfor.create);
    res.send("Hello world");
})

app.get("/test", async (req, res) => {
    const  test = await GameInfor.create({ name: 'Gmae', types: "asdf", photos: "asdkfs" });
    res.json({
        code: 200,
        metadata: test
    });
})


