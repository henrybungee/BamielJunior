const Discord = require('discord.js');
const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/custom.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "$";
    let check = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    directory = path.join(__dirname + '/../storage/custom.json')

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let linkPlatform = args[2];
    let link = args[1];

    if (!linkPlatform) {
        platform = "Custom Link";
    }

    if (!link) {
        const improperUsage = new Discord.MessageEmbed()
            .setTitle("How to use Set Custom Link")
            .setColor("#ed411f")
            .setDescription("Use this command to set your custom link\n through the bot. It will appear on your profile.\nYou can use this command to promote your website or Twitter.")
            .addField("Example Usage:", "$setcustom https://github.com/user GitHub")
            .setTimestamp();

        return msg.channel.send(improperUsage);
    }

    if (link.toLowerCase() === "--clear") {
        msg.channel.send("Got it, your Bandcamp has been cleared.");        
        botstorage[msg.author.id] = "";
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (!validUrl.isUri(link)) {
        return msg.channel.send("Provide a valid site on the internet!");
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
