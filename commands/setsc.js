const Discord = require('discord.js');
const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/soundcloud.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";
    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    let soundcloudEmoji = client.emojis.cache.find(emoji => emoji.name === "soundcloud");

    var link = args[1];
    //args.slice(1).join(" ");

    function findWord(word, str) {
        return RegExp('\\b'+ word +'\\b').test(str)
    }

    if (!link) {
        const improperUsage = new Discord.MessageEmbed()
            .setTitle("How to use Set Soundcloud")
            .setColor("#ed411f")
            .setDescription("Use this command to set your Soundcloud\n through the bot. It will appear on your profile.")
            .addField("Example Usage:", "$setsc https://soundcloud.com/c418")
            .setTimestamp();

        return msg.channel.send(improperUsage);
    }

    if (link.toLowerCase() === "--clear") {
        msg.channel.send("Got it, your Soundcloud has been cleared.");        
        botstorage[msg.author.id] = "";
        return fs.writeFileSync(path.join(__dirname + '/../storage/soundcloud.json'), JSON.stringify(botstorage));
    }

    if (!link.startsWith("https://soundcloud.com/")) {
        return msg.channel.send("Provide a valid link plz");
    }

    if (link.length >= 100) {
        return msg.channel.send("Your Soundcloud link has to be under **100** characters!");
    }

    directory = path.join(__dirname + '/../storage/soundcloud.json')

    botstorage[msg.author.id] = link;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Soundcloud Successfully Set!")
        .setColor("#ff7700")
        .setDescription(soundcloudEmoji.toString() + " Your Soundcloud has been successfully set!")
        .setFooter("View your link on your profile with $profile")
        .setTimestamp();

    msg.channel.send(successEmbed);
}
