const path = require('path');
const botstorage = require(path.join(__dirname + '/../storage/daws.json')); // path may vary
const fs = require('fs');
const Discord = require('discord.js');

module.exports = (client, msg) => {
    //testing a change
    let prefix = "%";

    directory = path.join(__dirname + '/../storage/daws.json')

    var checkmark = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let daw = args.slice(1).join(" ");

    if (!daw) {
        const improperUsage = new Discord.MessageEmbed()
            .setTitle("How to use Set DAW")
            .setColor("#ed411f")
            .setDescription("Use this command to set your digital audio workstation\n through the bot. It will appear on your profile.\nYou can use this command to let others know how you make\n your music.")
            .addField("Example Usage:", "$setdaw Ableton Live\n$setdaw Ableton Live, FL Studio 20")
            .setTimestamp();

        return msg.channel.send(improperUsage);
    }

    if (daw.toLowerCase() === "--clear") {
        msg.channel.send("Got it, your DAW has been cleared.");
        botstorage[msg.author.id] = "";
        return fs.writeFileSync(directory, JSON.stringify(botstorage));
    }

    if (daw.length > 20) {
        return msg.channel.send("You're DAW must be under **20** characters long!");
    }

    botstorage[msg.author.id] = daw;
    fs.writeFileSync(directory, JSON.stringify(botstorage));

    msg.channel.send(checkmark.toString() + " Got it! Your DAW of choice is now `" +botstorage[msg.author.id] + "`");
}
