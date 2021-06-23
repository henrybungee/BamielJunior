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
    let linkPlatform = args[1];
    let link = args[2];

    if (!linkPlatform) {
        platform = "Custom Link";
    }

    if (!link) {
        msg.channel.send("Got it, your custom link has been cleared.");
        botstorage[msg.author.id] = "";
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (!link.startsWith('https://')) {
           return msg.channel.send("Provide a valid site on the internetz");
    }

    if (link.length >= 100) {
        return msg.channel.send("Your custom link has to be under **100** characters!");
    }

    if (linkPlatform.length > 30) {
        return msg.channel.send("Your custom link platform has to be under **30** characters!");
    }

    if (linkPlatform.trim().length === 0) {
        return msg.channel.send("Specify a link platform");
    }

    console.log(linkPlatform);

    botstorage[msg.author.id] = { platform: linkPlatform, link: link};
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Custom Link Successfully Set!")
        .setDescription(check.toString() + " Custom link successfully set!")
        .setFooter("View your profile with $profile to see the link")
        .setTimestamp();

    msg.channel.send(successEmbed);
}
