const Discord = require('discord.js');

module.exports = (client, msg) => {
    const helpEmbed = new Discord.MessageEmbed()
        .setTitle("👋 Hi! I'm LinkBot!")
        .setAuthor("Requested by " +msg.author.tag, msg.author.displayAvatarURL({dyanmic:true}))
        .setColor("#fff170")
        .setDescription("But people here just call me Bamiel Junior. \nHere are my commands. Anything with a \n`*` is for admins only! My prefix is: `$`")
        .addField("Basics:", `\
help - This command!
ping - Bot's ping time
trophies - View your trophies
profile - View your profile
report - Report someone's profile
rchannel - View the channel where reports are sent **\***
list - View blacklisted users **\***
blacklist - Blacklist a user **\***
feedback - Send feedback to the bot dev`)
        .addField("Setting Links:", `\
setbc - Bandcamp
setyt - YouTube
setsc - SoundCloud
setspotify - Spotify
setd - Description
setname - Profile name
setlt - Linktree
setcolor - Custom color
setcustom - Custom link
setdaw - DAW
setrchannel - Reporting channel **\***`)
        .addField("View Links:", `\
bc - Bandcamp
yt - YouTube
sc - SoundCloud
daw - DAW
spotify - Spotify
trophies - Trophies`)
        .setTimestamp();

    msg.channel.send(helpEmbed);
}
