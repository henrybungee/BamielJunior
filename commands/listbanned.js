const Discord = require('discord.js');
const fs = require('fs');

module.exports = (client, msg) => {
    const blacklistEmbed = new Discord.MessageEmbed()
        .setTitle("Blacklisted Users")
        .setColor("#eb2a23")
        .setAuthor("Requested by " +msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
        .setDescription("This is a list of the blacklisted users!   \nThey are not able to use to bot in any form.");

    var text = fs.readFileSync('./blacklist.txt', 'utf-8');

    function lineCount( text ) {
        var nLines = 0;
        for( var i = 0, n = text.length;  i < n;  ++i ) {
            if( text[i] === '\n' ) {
                ++nLines;
            }
        }
        return nLines;
    }

    if (lineCount(text) < 1) {
        console.log("no blacklist");
        return msg.channel.send("Nobody is blacklisted!");
    }

    fs.readFileSync('./blacklist.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
        var user = msg.guild.members.cache.get(line);
        if (!user) {
            console.log("not a user");
        }
        else if (user) {
            blacklistEmbed.addField(user.user.username, "has been blacklisted");
        }
    });

    msg.channel.send(blacklistEmbed);
}