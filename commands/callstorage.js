const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/teststorage.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change

    directory = path.join(__dirname + '/../storage/teststorage.json')

    msg.channel.send("Test storage for user " +msg.author.username + ": **" +botstorage[msg.author.id]+ "**");
}