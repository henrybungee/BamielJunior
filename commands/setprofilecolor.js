const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/color.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";

    directory = path.join(__dirname + '/../storage/color.json')

    var checkmark = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let color = args.slice(1).join(" ");
    if (!color) {
        return msg.channel.send('🎨 Please specify a color. Use hex colors only! Leave your color as `#ffffff` for the default embed color.');
    }

    if (!color.startsWith("#"))
        return msg.channel.send("Hex codes start with a `#`, bro. If you don't have one, it's not a hex. Please fix that.")
    botstorage[msg.author.id] = color;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    msg.channel.send(checkmark.toString() + " Got it! Your profile color is now `" +botstorage[msg.author.id] + "`");
}