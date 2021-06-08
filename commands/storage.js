const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/teststorage.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";

    directory = path.join(__dirname + '/../storage/teststorage.json')

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    botstorage[msg.author.id] = args[1];
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    msg.channel.send("Test storage changed: **" +botstorage[msg.author.id] + "**");
}