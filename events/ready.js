//https://discord.com/oauth2/authorize?client_id=723267051707170947&scope=bot
const { stat } = require("fs");

module.exports = (client, msg) => {
    console.log("Im ready");

    client.user.setActivity(" the C418 server and linking some music", { type: "WATCHING"});
}
