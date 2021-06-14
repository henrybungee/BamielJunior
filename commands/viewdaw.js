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

    console.log(botstorage[user.id]);

		var lowerCaseDAW = botstorage[user.id].toLowerCase().split(" ").join("");

    const embed = new Discord.MessageEmbed()
        .setAuthor(user.user.tag + "'s DAW of Choice", user.user.displayAvatarURL({dynamic: true}))
        .setDescription(botstorage[user.id])
        .setTimestamp();

		switch(lowerCaseDAW) {
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
				embed.addField("DAW Website:", "[Logic Pro](https://www.apple.com/logic-pro/)");
				break;
			case "logicpro":
				embed.addField("DAW Website:", "[Logic Pro](https://www.apple.com/logic-pro/)");
				break;
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
				embed.addField("DAW Website:", "Everyone knows where Garageband is noob");
				break;
			case "protools":
				embed.addField("DAW Website:", "(Pro Tools)[https://www.avid.com/pro-tools]");
				break;
			case "soundtrap":
				embed.addField("DAW Website:", "(Soundtrap)[https://www.soundtrap.com/]");	
				break;
			default:
				break;
		}

    msg.channel.send(embed);

    //msg.delete();

}