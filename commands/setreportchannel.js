const Discord = require('discord.js');
const botstorage = require(path.join(__dirname + '/../storage/reportchannel.json'));
const fs = require('fs');

module.exports = (client, msg) => {
    let prefix = "$";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    var channelID = args[1];

    // if (!msg.author.hasPermission("ADMINISTRATOR") || !msg.author.hasPermission("MANAGE_CHANNELS")) {
    //     return msg.channel.send("✋ Stop right there. I can't let you do that.");
    // }

    if (!channelID) {
        return msg.channel.send("Needa specify a channel ID that I'll send reports to.");
    }

    var channel = msg.guild.channels.cache.get(channelID);

    if (!channel) {
        return msg.channel.send("Supply a valid channel ID, buddy ol' pal");
    }

    directory = path.join(__dirname + '/../storage/reportchannel.json')

    botstorage[msg.guild.id] = channelID;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Report Channel Successfully Set!")
        .setColor("#fc4103")
        .setDescription("📣 The report channel has been successfully set to `#" +channel.name+ "`!")
        .setFooter("All user reports will go here!")
        .setTimestamp();

    msg.channel.send(successEmbed);

}