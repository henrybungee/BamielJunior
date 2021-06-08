const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/daws.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";

    directory = path.join(__dirname + '/../storage/daws.json')

    var checkmark = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let daw = args.slice(1).join(" ");
    if (!daw) {
        return msg.channel.send('Supply a DAW dum dum');
    }
    botstorage[msg.author.id] = daw;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    msg.channel.send(checkmark.toString() + " Got it! Your DAW of choice is now `" +botstorage[msg.author.id] + "`");
}