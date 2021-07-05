const Discord = require('discord.js');
const path = require('path');
const blacklist = require('./blacklistuser');
const trophies = require('./trophies');
const bcBotstorage = require(path.join(__dirname + '/../storage/bandcamp.json'));
const nameBotstorage = require(path.join(__dirname + '/../storage/names.json'));
const ytBotstorage = require(path.join(__dirname + '/../storage/youtube.json'));
const descBotstorage = require(path.join(__dirname + '/../storage/descriptions.json'));
const dawsBotstorage = require(path.join(__dirname + '/../storage/daws.json'));
const scBotstorage = require(path.join(__dirname + '/../storage/soundcloud.json'));
const colorBotstorage = require(path.join(__dirname + '/../storage/color.json'));
const ltBotstorage = require(path.join(__dirname + '/../storage/treelink.json'));
const spotBotstorage = require(path.join(__dirname + '/../storage/spotify.json'));
const clBotstorage = require(path.join(__dirname + '/../storage/custom.json'));
const favBotstorage = require(path.join(__dirname + '/../storage/favorite.json'));

module.exports = async (client, msg) => {
    const { channel, author: authorUser } = msg;

    const prefix = '%';
    const args = msg.content.slice(prefix.length).trim().split(/\s+/);

    const userMention = msg.mentions.users.first();
    let user;
    try {
        if (userMention) {
            user = await client.users.fetch(userMention.id);
        } else if (args[1]) {
            user = await client.users.fetch(args[1]);
        } else {
            user = authorUser;
        }
    } catch {
        user = authorUser;
    }

    if (user.bot) {
        await channel.send("Bots don't have profiles so don't go lookin' for one");
        return;
    }

    const userId = user.id;
    if ((await blacklist.getBlacklistedUserIds()).indexOf(userId) >= 0) {
        const blacklistEmbed = new Discord.MessageEmbed()
            .setDescription('❌ This user is blacklisted! You cannot view their profile.');
        await channel.send(blacklistEmbed);
        return;
    }

    const profileEmbed = new Discord.MessageEmbed()
        .setTitle(nameBotstorage[userId] || user.username)
        .setColor(colorBotstorage[userId] || '#303030')
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setDescription(descBotstorage[userId] || 'No description set');

    const ytEmoji = client.emojis.cache.find(emoji => emoji.name === 'yt');
    const bandcampEmoji = client.emojis.cache.find(emoji => emoji.name === 'bandcamp');
    const scEmoji = client.emojis.cache.find(emoji => emoji.name === 'soundcloud');
    const spotEmoji = client.emojis.cache.find(emoji => emoji.name === 'spotify');

    if (dawsBotstorage[userId]) {
        profileEmbed.addField('DAW:', dawsBotstorage[userId]);
    }
    if (bcBotstorage[userId]) {
        profileEmbed.addField(bandcampEmoji.toString() + ' Bandcamp:', `[Click here](${bcBotstorage[userId]})`);
    }
    if (ytBotstorage[userId]) {
        profileEmbed.addField(ytEmoji.toString() + ' YouTube:', `[Click here](${ytBotstorage[userId]})`);
    }
    if (scBotstorage[userId]) {
        profileEmbed.addField(scEmoji.toString() + ' SoundCloud:', `[Click here](${scBotstorage[userId]})`);
    }
    if (spotBotstorage[userId]) {
        profileEmbed.addField(spotEmoji.toString() + ' Spotify:', `[Click here](${spotBotstorage[userId]})`);
    }
    if (ltBotstorage[userId]) {
        profileEmbed.addField('Linktree:', `[Click here](${ltBotstorage[userId]})`);
    }
    if (clBotstorage[userId]) {
        profileEmbed.addField(clBotstorage[userId].platform, `[Click here](${clBotstorage[userId].link})`);
    }
    if (favBotstorage[userId]) {
        profileEmbed.addField('Fav Musician:', favBotstorage[userId]);
    }

    if (trophies.getUserTrophies(userId).length > 0) {
        trophies.addUserTrophiesEmbedField(profileEmbed, userId);
    }

    await channel.send(profileEmbed);
};
