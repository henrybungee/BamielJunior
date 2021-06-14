const Discord = require("discord.js");
const fs = require('fs');
const botstorage = require(path.join(__dirname + '/../storage/reportchannel.json'));

module.exports = (client, msg) => {
    let prefix = "$";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let userID = args[1];
    let reason = args.slice(2).join(" ");

    let check = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    let user = msg.guild.members.cache.get(userID) || msg.guild.members.cache.get(msg.mentions.members.first().id);

		if (!user) {
			return msg.channel.send("Supply a valid user or ping!");
		}

    if (user.user.bot) {
        return msg.channel.send("Bro bots don't have profiles, they can't do anything wrong");
    }

    if (!reason) {
        return msg.channel.send("Look pal, if you ain't gonna give us an actual report then why submit one in the first place?");
    }

    if (!botstorage[msg.guild.id]) {
        return msg.channel.send("📣 There is no report channel set! Notify a mod immediately! This is very important.")
    }

    let rChannel = msg.guild.channels.cache.get(botstorage[msg.guild.id]);

    if (!rChannel) {
        return msg.channel.send("**🥳 You officially broke the bot!**\nYou somehow managed to submit an invalid channel ID. Or you just deleted the channel after submitting it :|");
    }

    const reportSuccessEmbed = new Discord.MessageEmbed()
        .setAuthor(user.user.username + " reported", user.user.displayAvatarURL({dynamic:true}))
        .setTitle("📣 Report Sent!")
        .setDescription(check.toString() + " Your report has been sent to the reports channel")
        .setFooter("Report pending investigation")
        .setTimestamp();

    const reportEmbed = new Discord.MessageEmbed()
        .setTitle("📣 There's a report in!")
        .setColor("#fc4103")
        .setDescription("Report sent by " +msg.author.username + ". They are reporting <@" +user.user.id+ ">.")
        .addField("Reason:", reason)
        .setFooter("Please investigate this!")
        .setTimestamp();

    rChannel.send(reportEmbed);
    msg.channel.send(reportSuccessEmbed);
}