const Discord = require('discord.js');
const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/userinfo.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {
    let prefix = "%";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);

    var userMention = msg.mentions.users.first();
    var id = args[1];
    var user;

    var reason = args.slice(2).join(" ");

    if (msg.member.hasPermission("ADMINISTRATOR") || msg.author.id != "527523815660453889") 
        return msg.channel.send("You don't have permission to verify and unverify users!");

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

    if (!reason) {
        reason = "No Reason Specified";
    }

    msg.channel.send("Unverifying user **" +user.user.username+ "**...").then((loadingMessage) => {
        setTimeout(function () {
            botstorage[user.id] = {verified: false};
            loadingMessage.edit(`Fun while it lasted. User **${user.user.username}** is now not verified`);
            return fs.writeFileSync(path.join(__dirname + '/../storage/userinfo.json'), JSON.stringify(botstorage));
        }, 3000);
    });
}