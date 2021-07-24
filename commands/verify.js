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
    let verified = client.emojis.cache.find(emoji => emoji.name === "verifiedartist");

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

    if (user.bot) {
        return msg.channel.send("You can't verify a bot!")
    }

    if (msg.author.id === user.id) {
        return msg.channel.send("You can't verify yourself!")
    }

    if (user.id === "851569621106032651" /*hey ortho when this goes to live replace this id with the bot id or remove it idc*/) {
        return msg.channel.send("Don't verify me. I'm already verified by God :sunglasses:")
    }

    if (!reason) {
        reason = "No Reason Specified";
    }

    const congratsEmbed = new Discord.MessageEmbed()
        .setTitle(verified.toString() + " You've Been Verified!")
        .setColor("#1DA1F2")
        .setDescription("The administrators of this server have decided\nthat you were fit for our verification program!\nWelcome aboard.")
        .addField(msg.author.username + " said:", reason)
        .setFooter("Congrats ;)");

    msg.channel.send("Verifying user **" +user.user.username+ "**...").then((loadingMessage) => {
        setTimeout(function () {
            user.user.send(congratsEmbed);
            botstorage[user.id] = {verified: true};
            loadingMessage.edit(`${verified.toString()} Congrats! User **${user.user.username}** is now verified!`);
            return fs.writeFileSync(path.join(__dirname + '/../storage/userinfo.json'), JSON.stringify(botstorage));
        }, 3000);
    });
}