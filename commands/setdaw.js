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
        msg.channel.send("Got it, it has been cleared. It was previously ```" + botstorage[msg.author.id] + "```in case this was an accident");
        botstorage[msg.author.id] = desc;
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    botstorage[msg.author.id] = daw;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    msg.channel.send(checkmark.toString() + " Got it! Your DAW of choice is now `" +botstorage[msg.author.id] + "`");
}
