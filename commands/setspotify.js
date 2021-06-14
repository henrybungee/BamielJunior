const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/spotify.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "$";
    let spotify = client.emojis.cache.find(emoji => emoji.name === "spotify");

    directory = path.join(__dirname + '/../storage/spotify.json')

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let link = args[1];

    if (!link)
        return msg.channel.send("Supply a Spotify link plz");
    
    if (!link.startsWith('https://open.spotify.com/artist/')) {
           return msg.channel.send("Provide a Spotify link plz " +spotify.toString());
    }

    botstorage[msg.author.id] = link;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Spotify Successfully Set!")
        .setColor("#1DB954")
        .setDescription(spotify.toString() + " Spotify successfully set!")
        .setFooter("View your profile with $profile to see the link")
        .setTimestamp();

    msg.channel.send(successEmbed);
}