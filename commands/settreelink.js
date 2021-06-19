const Discord = require('discord.js');
path = require('path');
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
        msg.channel.send("Got it, it has been cleared. It was previously ```" + botstorage[msg.author.id] + "```in case this was an accident");
        botstorage[msg.author.id] = desc;
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (!linktree.startsWith('https://')) {
        return msg.channel.send("That ain't a link, buddy.");
    }

    if (!findWord("linktr.ee", linktree)) {
        return msg.channel.send("That ain't a linktree link :|");
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
