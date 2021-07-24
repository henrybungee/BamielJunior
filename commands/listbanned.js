const Discord = require('discord.js');
const blacklist = require('./blacklistuser');

module.exports = async (client, msg) => {
    const { channel, author: authorUser, member: authorMember } = msg;

    if (!authorMember.hasPermission('ADMINISTRATOR')) {
        await channel.send("You need the `ADMINISTRATOR` permission to use this command.\n\n**Why?** This command doesn't exist to shame people. Admins are the most trusted people in this server so we know they'll use this information in a positive way.");
        return;
    }

    const blacklistedUserIds = await blacklist.getBlacklistedUserIds();
    if (blacklistedUserIds.length === 0) {
        await msg.channel.send('Nobody is blacklisted!');
        return;
    }
    const blacklistEmbed = new Discord.MessageEmbed()
        .setTitle('Blacklisted Users')
        .setColor('#eb2a23')
        .setAuthor('Requested by ' + authorUser.username, authorUser.displayAvatarURL({dynamic: true}))
        .setDescription('This is a list of the blacklisted users!\nThey are not able to use to bot in any form.');
    const blacklistedUserPromises = blacklistedUserIds
        .map(id => client.users.fetch(id));
    for (let i = 0; i < blacklistedUserPromises.length; i++) {
        const user = await blacklistedUserPromises[i];
        const id = blacklistedUserIds[i];
        if (user) {
            blacklistEmbed.addField(user.username, `has been blacklisted (user ID ${id})`);
        } else {
            console.log(`Note: no user found for blacklisted ID ${id}`);
            blacklistEmbed.addField(id, 'has been blacklisted (user ID shown)');
        }
    }

    const sentEmbed = new Discord.MessageEmbed()
        .setTitle("Check your DMs!")
        .setDescription("A list of the blacklisted users in this server have been sent to you via DMs.")
        .setTimestamp();

    msg.channel.send(sentEmbed);
    authorUser.send(blacklistEmbed);
};
