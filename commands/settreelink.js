const Discord = require('discord.js');
const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/treelink.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";

    let check = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    directory = path.join(__dirname + '/../storage/treelink.json')

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let linktree = args[1];

    function findWord(word, str) {
        return RegExp('\\b'+ word +'\\b').test(str)
    }

    if (!linktree) {
        const improperUsage = new Discord.MessageEmbed()
            .setTitle("How to use Set Linktree")
            .setColor("#ed411f")
            .setDescription("Use this command to set your linktree\n through the bot. It will appear on your profile.\nLong lists of websites are for people who don't\n have time to make a linktr.ee.")
            .addField("Example Usage:", "$setlt https://linktr.ee/guardian")
            .setTimestamp();

        return msg.channel.send(improperUsage);
    }

    if (linktree.toLowerCase() === "--clear") {
        msg.channel.send("Got it, your Linktree has been cleared.");
        botstorage[msg.author.id] = "";
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (!linktree.startsWith('https://linktr.ee/')) {
        return msg.channel.send("That ain't a linktr.ee link, buddy.");
    }

    if (linktree.length >= 100) {
        return msg.channel.send("Your linktr.ee link has to be under **100** characters!");
    }

    botstorage[msg.author.id] = linktree;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Linktree Successfully Set!")
        .setColor("#9403fc")
        .setDescription(check.toString() + " Linktree successfully set!")
        .setFooter("View your profile with $profile")
        .setTimestamp();

    msg.channel.send(successEmbed);
}
