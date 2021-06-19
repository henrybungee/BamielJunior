const Discord = require('discord.js');

module.exports = (client, msg) => {
    let prefix = "$";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let feature = args.slice(1).join(" ");

    if (!feature) {
        return msg.channel.send("Please specify some feedback!");
    }

    const sendEmbed = new Discord.MessageEmbed()
        .setTitle("Feedback from: " +msg.author.username)
        .setDescription(feature)
        .setTimestamp();

    const success = new Discord.MessageEmbed()
        .setTitle("📣 Feedback sent!")
        .setColor("#5ffa69")
        .setDescription("Your feedback will be reviewed by the creator. However, do not misuse this feature or you will be blacklisted from using this command.")
        .setTimestamp();

    msg.channel.send(success);

    let me = msg.guild.members.cache.get("527523815660453889");

    me.send(sendEmbed);
}
