const Discord = require('discord.js');

module.exports = (client, msg) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("Trophies 🏆")
        .setColor("#ede76b")
        .setDescription("What are trophies? Trophies are special little touch to this bot. If you are lucky enough to recieve a trophy from the creator, it will appear on your profile. Trophies aren't easy to get though because they are hard coded into the bot. The creator will give one to you if he thinks you deserve it.")
        .addField("If you're seeing this:", "This means you don't have any trophies or the user you mentioned doesn't have any trophies. Tough luck.")
        .setTimestamp();

    //trophies

    let prefix = "$";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    var user = msg.mentions.users.first();

    if (!user) {
        user = msg.guild.members.cache.get(args[1]).user;
        if (!user)
            user = msg.author;
    }

    const profile = new Discord.MessageEmbed()
        .setTitle(user.username + "'s trophies")
        .setColor("#ede76b")
        .setDescription("Here are the trophies you recieved from the creator (lucky you):")
        .setTimestamp();


    switch(user.id) {
        case "527523815660453889:
            profile.addField("🏆 Trophies (gifted by owner):", "⚙️ Bot Dev\n😎 Epic Person");
            break;

        case "481591703959240706":
            profile.addField("🏆 Trophies (gifted by owner):", priz.toString() + " PRIZ ;]\n💻 Coder Man");
            break;

        case "271045041487740940":
            profile.addField("🏆 Trophies (gifted by owner):", "⚙️ Early Tester\n💠 Cool Dude v2");
            break;

        case "235833960364638219":
            profile.addField("🏆 Trophies (gifted by owner):", "⚙️ Early Tester");
            break;

        case "743256356533960754":
            profile.addField("🏆 Trophies (gifted by owner):", "⚙️ Early Tester\n💛 Big Pee");
            break;

        default:
            // If the user does not have any trophies, this case is thrown.
            return msg.channel.send(embed);
    }

    msg.channel.send(profile);
}
