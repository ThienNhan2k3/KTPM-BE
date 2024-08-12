const express = require("express");
var cors = require('cors');
const { GameInfor } = require('./models')
const app = express();


require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));