const Discord = require('discord.js');
const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/soundcloud.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {

    let prefix = "%";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    var userMention = msg.mentions.users.first();
    var id = args[1];
    var user;

    let soundcloudEmoji = client.emojis.cache.find(emoji => emoji.name === "soundcloud");

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

    directory = path.join(__dirname + '/../storage/soundcloud.json')

    if (!botstorage[user.id] || botstorage[user.id].length <= 0) {
        return msg.channel.send(user.user.username + " doesn't have a Soundcloud!");
    }

    console.log(botstorage[user.id]);

    const scEmbed = new Discord.MessageEmbed()
        .setAuthor(user.user.tag + "'s Soundcloud", user.user.displayAvatarURL({dynamic: true}))
        .setDescription(soundcloudEmoji.toString() +" "+ `Click [here](${botstorage[user.id]}) to view ${user.user.username}'s Soundcloud`)
        .setTimestamp();

    msg.channel.send(scEmbed);

    //msg.delete();

}