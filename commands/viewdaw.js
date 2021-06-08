const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/daws.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {

    let prefix = "%";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    var userMention = msg.mentions.users.first();
    var id = args[1];
    var user;


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

    directory = path.join(__dirname + '/../storage/daws.json')

    if (!botstorage[user.id]) {
        return msg.channel.send(user.user.username + " doesn't have a DAW of choice (probably doesn't make music)!");
    }

    console.log(botstorage[user.id]);

    const bcEmbed = new Discord.MessageEmbed()
        .setAuthor(user.user.tag + "'s DAW of Choice", user.user.displayAvatarURL({dynamic: true}))
        .setDescription(botstorage[user.id])
        .setTimestamp();

    msg.channel.send(bcEmbed);

    //msg.delete();

}