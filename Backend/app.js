const bcrypt = require("bcrypt");

async function app() {
    console.log(await bcrypt.hash("123456", 10));
}

app();