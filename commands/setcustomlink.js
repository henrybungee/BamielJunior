const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/custom.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "$";
    let check = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    directory = path.join(__dirname + '/../storage/custom.json')

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let link = args[1];

    if (!link)
        return msg.channel.send("Feed me yo website * chomp chomp *");
    
    if (!link.startsWith('https://')) {
           return msg.channel.send("Provide a valid site on the internetz");
    }

    botstorage[msg.author.id] = link;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Custom Link Successfully Set!")
        .setDescription(check.toString() + " Custom link successfully set!")
        .setFooter("View your profile with $profile to see the link")
        .setTimestamp();

    msg.channel.send(successEmbed);
}