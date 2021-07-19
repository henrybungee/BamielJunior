const Discord = require('discord.js');
const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/spotify.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "$";
    let spotify = client.emojis.cache.find(emoji => emoji.name === "spotify");

    directory = path.join(__dirname + '/../storage/spotify.json')

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let link = args[1];

    if (!link) {
        const improperUsage = new Discord.MessageEmbed()
            .setTitle("How to use Set Spotify")
            .setColor("#ed411f")
            .setDescription("Use this command to set your Spotify\n through the bot. It will appear on your profile.")
            .addField("Example Usage:", "$setsp https://open.spotify.com/artist/4uFZsG1vXrPcvnZ4iSQyrx")
            .setTimestamp();

        return msg.channel.send(improperUsage);
    }

    if (link.toLowerCase() === "--clear") {
        msg.channel.send("Got it, your Spotify has been cleared.");
        botstorage[msg.author.id] = null;
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (!link.startsWith('https://open.spotify.com/artist/')) {
           return msg.channel.send("Provide a Spotify link plz " +spotify.toString());
    }

    if (link.length >= 100) {
        return msg.channel.send("Your Spotify link has to be under **100** characters!");
    }

    botstorage[msg.author.id] = "";
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Spotify Successfully Set!")
        .setColor("#1DB954")
        .setDescription(spotify.toString() + " Spotify successfully set!")
        .setFooter("View your profile with $profile to see the link")
        .setTimestamp();

    msg.channel.send(successEmbed);
}
