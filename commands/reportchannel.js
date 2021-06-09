const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/reportchannel.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {

    directory = path.join(__dirname + '/../storage/reportchannel.json')

    let channel = msg.guild.channels.cache.get(botstorage[msg.guild.id]);

    if (!botstorage[msg.guild.id]) {
        return msg.channel.send("This server doesn't have a report channel, please set one!")
    }

    msg.channel.send("📣 The report channel for " +msg.guild.name+ " is `#" +channel.name+ "`");

}