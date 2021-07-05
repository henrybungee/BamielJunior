const Discord = require('discord.js');
const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/favorite.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    directory = path.join(__dirname + '/../storage/favorite.json')

    let prefix = "$";

    var checkmark = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let favorite = args.slice(1).join(" ");

    botstorage[msg.author.id] = favorite;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    if (!favorite) {
        msg.channel.send("Got it, your favorite artist has been cleared.");
        botstorage[msg.author.id] = "";
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (favorite.length > 30) {
        return msg.channel.send("Your favorite artist's name is too long! Make sure it is under **30** characters long! If this is the actual artist's name, email a mod or the creator and we'll make an exception for you.");
    }

    const successEmbed = new Discord.MessageEmbed()
        .setTitle("Successfully set your favorite musician " +checkmark.toString())
        .setColor("#27f568")
        .setDescription("On your profile your favorite musician will now be: `" +favorite+ "`! Why would you put this information in? Everyone has some form of inspiration! It's important to let others interested in your work know who's behind your madness. Or maybe not.")
        .setTimestamp();


    msg.channel.send(successEmbed);
}
