const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/reportchannel.json')); // path may vary

module.exports = (client, msg) => {

    directory = path.join(__dirname + '/../storage/reportchannel.json')

    let channel = msg.guild.channels.cache.get(botstorage[msg.guild.id]);

    if (!msg.member.hasPermission("MANAGE_MESSAGES") || !msg.member.hasPermission("ADMINISTRATOR")) {
        return msg.channel.send("You cannot view the report channel for this server. Make sure you have either `MANAGE_MESSAGES` or `ADMINISTRATOR` permissions.")
    }

    if (!botstorage[msg.guild.id]) {
        return msg.channel.send("This server doesn't have a report channel, please set one!")
    }

    msg.channel.send("📣 The report channel is <#" +channel.id+ ">");

}
