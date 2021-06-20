const Discord = require('discord.js');
path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/daws.json')); // path may vary
const fs = require('fs');

module.exports = (client, msg) => {

    let prefix = "%";

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);


    var userMention = msg.mentions.users.first();
    var id = args[1];
    var user;

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

    directory = path.join(__dirname + '/../storage/daws.json')

    if (!botstorage[user.id]) {
        return msg.channel.send(user.user.username + " doesn't have a DAW of choice (probably doesn't make music)!");
    }

    var lowerCaseDAW = botstorage[user.id].toLowerCase().split(" ").join("");
    var daws = botstorage[user.id].trim().split(",");

    console.log(daws);

    const embed = new Discord.MessageEmbed()
        .setAuthor(daws.length > 1 ? user.user.tag + "'s DAW's of Choice" : user.user.tag + "'s DAW of Choice", user.user.displayAvatarURL({dynamic: true}))
        .setTimestamp();

    if (daws.length == 1)
        embed.setDescription(botstorage[user.id]);

    else {
        for (var i = 0; i < daws.length; i++) {
            embed.addField("DAW #" + (i + 1), daws[i]);
        }
    }

    switch(lowerCaseDAW) {
        // DAWs
        case "lmms":
            embed.addField("DAW Website:", "[LMMS](https://lmms.io/)");
            break;
        case "ableton":
            embed.addField("DAW Website:", "[Ableton Live](https://www.ableton.com/en/live/)");
            break;
        case "abletonlive":
            embed.addField("DAW Website:", "[Ableton Live](https://www.ableton.com/en/live/)");
            break;
        case "live":
            embed.addField("DAW Website:", "[Ableton Live](https://www.ableton.com/en/live/)");
            break;
        case "flstudio":
            embed.addField("DAW Website:", "[FL Studio](https://www.image-line.com/)");
            break;
        case "fl":
            embed.addField("DAW Website:", "[FL Studio](https://www.image-line.com/)");
            break;
        case "logic":
        case "logicpro":
        case "logicprox":
            embed.addField("DAW Website:", "[Logic Pro](https://www.apple.com/logic-pro/)");
            break;
        case "cubase":
            embed.addField("DAW Website:", "[Cubase](https://new.steinberg.net/cubase/)");
            break;
        case "reason":
            embed.addField("DAW Website:", "[Reason](https://www.reasonstudios.com/en/reason)");
            break;
        case "reaper":
            embed.addField("DAW Website:", "[Reaper](https://www.reaper.fm/)");
            break;
        case "bitwig":
            embed.addField("DAW Website:", "[Bitwig](https://www.bitwig.com/)");
            break;
        case "garageband":
            embed.addField("DAW Website:", "Everyone knows where Garageband is, noob. If not, [[macOS]](https://www.apple.com/mac/garageband/) [[iOS]](https://www.apple.com/garageband/)");
            break;
        case "protools":
            embed.addField("DAW Website:", "[Pro Tools](https://www.avid.com/pro-tools)\n*what a beastly machine*");
            break;
        case "soundtrap":
            embed.addField("DAW Website:", "[Soundtrap](https://www.soundtrap.com/)");
            break;
        case "muse":
            embed.addField("DAW Website:", "[MusE](https://muse-sequencer.github.io/)\n*check out musescore too!*")
            break;

        // Scores
        case "sibelius":
            embed.addField("DAW Website:", "[Sibelius](https://www.avid.com/sibelius)\n*sibelius crashed*");
            break;
        case "dorico":
            embed.addField("DAW Website:", "[Dorico](https://new.steinberg.net/dorico)\n*advanced*");
            break;
        case "musescore":
        case "muse score":
            embed.addField("DAW Website:", "[Mu͒seScore](https://musescore.com)");
            break;
        case "finale":
            embed.addField("DAW Website:", "[Finale](https://www.finalemusic.com/)");
            break;

        default:
            embed.setFooter("Is your DAW/Score Editor not on the list? Send your DAW\nto the creator with $feedback.");
            break;
    }

    msg.channel.send(embed);

    //msg.delete();

}
