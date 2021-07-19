const Discord = require('discord.js');
const validUrl = require('valid-url');
const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/bandcamp.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";
    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    let bandcampEmoji = client.emojis.cache.find(emoji => emoji.name === "bandcamp");

    var bcLink = args[1];
    //args.slice(1).join(" ");

    function findWord(word, str) {
        return RegExp('\\b'+ word +'\\b').test(str)
    }

    if (!bcLink) {
        const improperUsage = new Discord.MessageEmbed()
            .setTitle("How to use Set Bandcamp")
            .setColor("#ed411f")
            .setDescription("Use this command to set your Bandcamp link\n through the bot. It will appear on your profile\n and will be accesible to all users via the $bc command.")
            .addField("Example Usage:", "$setbc https://c418.bandcamp.com/")
            .setTimestamp();

        return msg.channel.send(improperUsage);
    }

    if (bcLink.toLowerCase() === "--clear") {
        msg.channel.send("Got it, your Bandcamp has been cleared.");        
        botstorage[msg.author.id] = "";
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (!validUrl.isUri(bcLink)) {
        return msg.channel.send("Provide a valid site on the internet!");
    }

    if (!bcLink.endsWith(".bandcamp.com") && !bcLink.endsWith(".bandcamp.com/")) {
        console.log("for some reason it didnt end with bandcamp.com")
        return msg.channel.send("Provide a valid Bandcamp link plz");
    }

    //sanitization
    if (bcLink.includes("?sneaky=")) {
        return msg.channel.send("No sneaky YouTube links!");
    }

    if (bcLink.length >= 100) {
        return msg.channel.send("Your Bandcamp link has to be under **100** characters!");
    }

    directory = path.join(__dirname + '/../storage/bandcamp.json')

    botstorage[msg.author.id] = bcLink;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Bandcamp Successfully Set!")
        .setColor("#629aa9")
        .setDescription(bandcampEmoji.toString() + " Your Bandcamp has been successfully set!")
        .setFooter("View your link on your profile with $profile")
        .setTimestamp();

    msg.channel.send(successEmbed);
}
