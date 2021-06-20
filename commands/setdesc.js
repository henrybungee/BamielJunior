const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/descriptions.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";

    let check = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    directory = path.join(__dirname + '/../storage/descriptions.json')

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let desc = args.slice(1).join(" ");

    if (!desc) {
        msg.channel.send("Got it, your description has been cleared.");
        botstorage[msg.author.id] = "";
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if(desc.length > 280) {
        return msg.channel.send("Your description is too long! Make sure it is under **280** characters long. Think tweet long.");
    }

    botstorage[msg.author.id] = desc;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Description Successfully Set!")
        .setColor("#a1ff5e")
        .setDescription(check.toString() + " Description successfully changed!")
        .setFooter("View your profile with $profile")
        .setTimestamp();

    msg.channel.send(successEmbed);
}
