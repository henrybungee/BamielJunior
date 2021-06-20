const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/youtube.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";

    let yt = client.emojis.cache.find(emoji => emoji.name === "yt");

    directory = path.join(__dirname + '/../storage/youtube.json')

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let link = args[1];

    if (!link) {
        msg.channel.send("Got it, your YouTube has been cleared.");        
        botstorage[msg.author.id] = null;
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (link.includes("watch?v=")) {
        msg.channel.send("Invalid YouTube channel link!");
        return;
    }

    if (!link.startsWith("https://www.youtube.com/c")) {
        msg.channel.send("Invalid YouTube channel link!");
        return;
    }

    botstorage[msg.author.id] = args[1];
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Youtube Successfully Set!")
        .setColor("#c4302b")
        .setDescription(yt.toString() + " Your Youtube has been successfully set!")
        .setFooter("View your link on your profile with $profile")
        .setTimestamp();

    msg.channel.send(successEmbed);
}
