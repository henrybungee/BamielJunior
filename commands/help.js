const Discord = require('discord.js');

module.exports = (client, msg) => {
    const helpEmbed = new Discord.MessageEmbed()
        .setTitle("👋 Hi! I'm LinkBot!")
        .setAuthor("Requested by " +msg.author.tag, msg.author.displayAvatarURL({dyanmic:true}))
        .setColor("#fff170")
        .setDescription("But people here just call me Bamiel Junior. \nHere are my commands. My prefix is: `$`")
        .addField("Basics:", "help, ping, trophies, profile, report, rchannel, \nlist, blacklist, feedback")
        .addField("Setting Links:", "setbc, setyt, setsc, setspotify, setd,\n setname, setlt, setcolor, setcustom, \nsetdaw, setrchannel")
        .addField("View Links:", "bc, yt, sc, daw, spotify")
        .setTimestamp();

    msg.channel.send(helpEmbed);
}