//https://discord.com/oauth2/authorize?client_id=723267051707170947&scope=bot
const { stat } = require("fs");

module.exports = (client, msg) => {
    console.log("Im ready");

    client.user.setActivity(" over the C418 Discord (in dev rn)", { type: "WATCHING"});
}
