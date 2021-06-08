const Discord = require('discord.js');
path = require('path');
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
        return msg.channel.send(soundcloudEmoji.toString() + " Bro you must provide a link!");
    }

    if (!link.startsWith("https://")) {
        return msg.channel.send("Provide a valid link plz");
    }

    //sanitization
    if (!link.startsWith("https://")) {
        return msg.channel.send("Supply a link plz");
    }

    
    if (!findWord("soundcloud", link)) {
        return msg.channel.send("Supply a soundcloud link plz");
    }

    directory = path.join(__dirname + '/../storage/soundcloud.json')

    botstorage[msg.author.id] = link;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Soundcloud Successfully Set!")
        .setColor("#ff7700")
        .setDescription(soundcloudEmoji.toString() + " Your Soundcloud has been successfully set!")
        .setFooter("View your link on your profile with !profile")
        .setTimestamp();

    msg.channel.send(successEmbed);
}