const Discord = require('discord.js');
const fsp = require('fs').promises;

// note: loads blacklist from disk every time
const getBlacklistedUserIds = async () => {
    try {
        const blacklistPath = './storage/blacklist.txt';
        return (await fsp.readFile(blacklistPath, 'utf-8')).trim().split(/\s+/);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.log(`Non-ENOENT error reading blacklist file: ${err}`);
        }
        return [];
    }
};

const blacklistCmd = async (client, msg) => {
    const { channel, author: authorUser, member: authorMember } = msg;
    const prefix = '$';
    const args = msg.content.slice(prefix.length).trim().split(/\s+/);

    if (!authorMember.hasPermission('ADMINISTRATOR')) {
        await channel.send("You cannot perform this action. You don't have the `ADMINISTRATOR` permission.");
        return;
    }

    const userArg = args.slice(1).join(' ');
    if (!userArg) {
        await channel.send('Pass a user ID so we can blacklist them');
        return;
    }

    let targetUser;
    try {
        targetUser = await client.users.fetch(userArg);
    } catch {
        try {
            targetUser = await client.users.fetch(msg.mentions.users.first().id);
        } catch {
        }
    }

    if (!targetUser) {
        await channel.send('Use a valid user ID or ping a user');
        return;
    }

    if (userArg === authorUser.id) {
        await channel.send("You can't blacklist yourself, silly");
        return;
    }

    if ((await getBlacklistedUserIds()).indexOf(targetUser.id) >= 0) {
        await channel.send('This user is already blacklisted');
        return;
    }

    const reactMessage = await channel.send(
        `⚠️ Careful there! Confirm that you want to blacklist **${targetUser.username}**. This is permanent.`);
    // do not await the initial reacts
    reactMessage.react('✅');
    reactMessage.react('❌');

    try {
        const collectedReactions = await reactMessage.awaitReactions(
            (reaction, user) => user.id == authorUser.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
            { max: 1, time: 15000 });
        if (collectedReactions.first().emoji.name == '✅') {
            const responseEmbed = new Discord.MessageEmbed();
            const targetUserAvatarUrl = targetUser.displayAvatarURL({dynamic: true});
            try {
                const blacklistFileHandle = await fsp.open('./storage/blacklist.txt', 'a', 0o666);
                await blacklistFileHandle.write(targetUser.id + '\n', null, 'utf8'); // assume all of data was written
                await blacklistFileHandle.close();
                console.log(`Blacklist file updated to include ${targetUser.id}`);
                responseEmbed
                    .setTitle('Blacklist successful')
                    .setColor('#8dff6e')
                    .setAuthor(targetUser.username + ' blacklisted!', targetUserAvatarUrl)
                    .setDescription(`I have blacklisted user ${targetUser.tag}.\nThey will not be able to use me in any way.\nTheir profile cannot be viewed now.`)
                    .setTimestamp();
            } catch (err) {
                console.log(`Error blacklisting user ${targetUser.id}: ${err}`);
                responseEmbed
                    .setTitle('Blacklist failed')
                    .setColor('#ff7e7e')
                    .setAuthor(targetUser.username + ' not blacklisted!', targetUserAvatarUrl)
                    .setDescription(`There was an error blacklisting user ${targetUser.tag}.`)
                    .addField('Error message', `\`\`\`${err}\`\`\``)
                    .setTimestamp();
            }
            await channel.send(responseEmbed);
        } else {
            await channel.send('I will not blacklist this user.');
        }
    } catch {
        // assume the exception is from timeout
        await channel.send('No reaction after 15 seconds, so I\'m gonna assume you don\'t wanna blacklist this user.');
    } finally {
        await reactMessage.delete();
    }
};

module.exports = {
    getBlacklistedUserIds,
    blacklistCmd,
};
