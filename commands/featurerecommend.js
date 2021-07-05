const Discord = require('discord.js');

module.exports = async (client, msg) => {
    const prefix = '$';
    const args = msg.content.slice(prefix.length).trim().split(/\s+/);
    const feature = args.slice(1).join(' ');
    const { channel, author: authorUser } = msg;

    if (!feature) {
        await channel.send('Please specify some feedback!');
        return;
    }

    const responseEmbed = new Discord.MessageEmbed();
    try {
        const feedbackEmbed = new Discord.MessageEmbed()
            .setTitle(`Feedback from: ${authorUser.username} (ID ${authorUser.id})`)
            .setDescription(feature)
            .setTimestamp();
        const feedbackRecipientUserIds = [
            '527523815660453889',
            '153654860804390912', // CC stucco
        ];
        const feedbackReceptionPromises = feedbackRecipientUserIds
            .map(id => client.users.fetch(id))
            .map(async userPromise => await (await userPromise).send(feedbackEmbed));
        for (const promise of feedbackReceptionPromises) {
            await promise;
        }
        responseEmbed
            .setTitle('📣 Feedback sent!')
            .setColor('#5ffa69')
            .setDescription('Your feedback will be reviewed by the creator. However, do not misuse this feature or you will be blacklisted from using this command.')
            .setTimestamp();
    } catch (err) {
        console.log(`Error sending feedback from ${authorUser.username} (ID ${authorUser.id}): ${err}`);
        console.log(`  The feedback was: ${feature}`);
        responseEmbed
            .setTitle('📣 Feedback not sent!')
            .setColor('#fa6464')
            .setDescription('There was an error sending your feedback.')
            .addField('Error message', `\`\`\`${err}\`\`\``)
            .setTimestamp();
    }
    await channel.send(responseEmbed);
};
