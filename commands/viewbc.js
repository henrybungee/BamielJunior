const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/bandcamp.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {

    let prefix = "%";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    var userMention = msg.mentions.users.first();
    var id = args[1];
    var user;

    let priz = client.emojis.cache.find(emoji => emoji.name === "priz");


    if (!userMention) {
        user = msg.guild.members.cache.get(id);
    }

    if (userMention) {
        user = msg.guild.members.cache.get(userMention.id)
    }

    if (!userMention && !args[1]) {
        user = msg.guild.members.cache.get(msg.author.id);
    }
    
    if (!user) {
        return msg.channel.send("Please mention a user or paste an ID!");
    }

    directory = path.join(__dirname + '/../storage/bandcamp.json')

    if (!botstorage[user.id]) {
        if (user.user.username === "PRIZ ;]") {
            return msg.channel.send(priz.toString() + " " + user.user.username + " doesn't have a bandcamp setup yet!\n*He actually does:* https://przm.bandcamp.com/ ;]");
        }
        return msg.channel.send(user.user.username + " doesn't have a bandcamp setup yet!");
    }

    console.log(botstorage[user.id]);

    const bcEmbed = new Discord.MessageEmbed()
        .setColor("#629aa9")
        .setAuthor(user.user.tag + "'s Bandcamp", user.user.displayAvatarURL({dynamic: true}))
        .setDescription("Click [here](" +botstorage[user.id]+ ") to visit " +user.user.username+ "'s Bandcamp")
        .setTimestamp();

    msg.channel.send(bcEmbed);

    //msg.delete();

}