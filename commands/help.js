const Discord = require('discord.js');

module.exports = (client, msg) => {
    const helpEmbed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setAuthor("Requested by " +msg.author.tag, msg.author.displayAvatarURL({dyanmic:true}))
        .setColor("#fff170")
        .setDescription("Here are the commands for this bot. \nThe prefix of this bot is: `$`")
        .addField("Basics:", "help, ping, trophies, profile, report, rchannel, \nlist, blacklist")
        .addField("Setting Links:", "setbc, setyt, setsc, setspotify, setd,\n setname, setlt, setcolor, setcustom, \nsetdaw, setrchannel")
        .addField("View Links:", "bc, yt, sc, daw, spotify")
        .setTimestamp();

    msg.channel.send(helpEmbed);
}