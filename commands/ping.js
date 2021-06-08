const Discord = require('discord.js');

module.exports = (client, msg) => {
    //testing a change
    msg.channel.send("Calculating Ping...").then((resultMessage) => {
        const ping = resultMessage.createdTimestamp - msg.createdTimestamp;
        resultMessage.edit(`🏓 The bot latency is \`${ping}ms\`, API Latency is \`${client.ws.ping}ms\`!`);
    });
}