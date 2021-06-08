const Discord = require('discord.js');
path = require('path');
const bcBotstorage = require(path.join(__dirname + '/../storage/bandcamp.json'));
const nameBotstorage = require(path.join(__dirname + '/../storage/names.json'));
const ytBotstorage = require(path.join(__dirname + '/../storage/youtube.json')); 
const descBotstorage = require(path.join(__dirname + '/../storage/descriptions.json'));
const dawsBotstorage = require(path.join(__dirname + '/../storage/daws.json'));
const scBotstorage = require(path.join(__dirname + '/../storage/soundcloud.json'));
const colorBotstorage = require(path.join(__dirname + '/../storage/color.json'));

const fs = require('fs');

module.exports = (client, msg) => {

    let prefix = "%";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    var userMention = msg.mentions.users.first();
    var id = args[1];
    var user;

    let yt = client.emojis.cache.find(emoji => emoji.name === "yt");
    let bandcampEmoji = client.emojis.cache.find(emoji => emoji.name === "bandcamp");
    let scEmoji = client.emojis.cache.find(emoji => emoji.name === "soundcloud");


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

    const profile = new Discord.MessageEmbed()
        .setTitle(nameBotstorage[user.id] ? nameBotstorage[user.id] : user.user.username)
        .setColor(colorBotstorage[user.id] ? colorBotstorage[user.id] : "#292929")
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        .setDescription(descBotstorage[user.id] ? descBotstorage[user.id] : "No description set")
        .addField("DAW:", dawsBotstorage[user.id] ? dawsBotstorage[user.id] : "No DAW set")
        .addField(bandcampEmoji.toString() + " Bandcamp:", bcBotstorage[user.id] ? `[Click here](${bcBotstorage[user.id]})` : "No Bandcamp")
        .addField(yt.toString() + " Youtube:", ytBotstorage[user.id] ? `[Click here](${ytBotstorage[user.id]})` : "No Youtube")
        .addField(scEmoji.toString() + " Soundcloud:", scBotstorage[user.id] ? `[Click here](${scBotstorage[user.id]})` : "No Soundcloud")
        .setTimestamp();

    msg.channel.send(profile);
}