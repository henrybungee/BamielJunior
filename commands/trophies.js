const Discord = require('discord.js');

const trophiesByUserId = (() => {
    // trophy constants
    const botDevTrophy = '⚙️ Bot Dev';
    const epicPersonTrophy = '😎 Epic Person';
    const coderManTrophy = '💻 Coder Man';
    const earlyTesterTrophy = '⚙️ Early Tester';
    const coolDudeV2Trophy = '💠 Cool Dude v2';
    const bigPeeTrophy = '💛 Big Pee';
    const prizTrophy = '<:priz:851844756488585266> PRIZ ;]';
    // user ID constants
    const bushId = '527523815660453889';
    const prizId = '481591703959240706';
    const bmbId = '271045041487740940';
    const luttyzId = '235833960364638219';
    const waterBottleId = '743256356533960754';
    return {
        [bushId]: [
            botDevTrophy,
            epicPersonTrophy,
        ],
        [prizId]: [
            prizTrophy,
            coderManTrophy,
        ],
        [bmbId]: [
            earlyTesterTrophy,
            coolDudeV2Trophy,
        ],
        [luttyzId]: [
            earlyTesterTrophy,
        ],
        [waterBottleId]: [
            earlyTesterTrophy,
            bigPeeTrophy,
        ],
    };
})();

// pre-joined trophy strings
const trophyStringsByUserId = Object.entries(trophiesByUserId).reduce(
    (acc, [id, trophies]) => { acc[id] = trophies.join('\n'); return acc; }, {});

const getUserTrophies = (userId) => trophiesByUserId[userId] || [];

const addUserTrophiesEmbedField = (embed, userId) => {
    embed.addField('🏆 Trophies:', trophyStringsByUserId[userId] || '(no trophies)');
};

const trophiesCmd = async (client, msg) => {
    const { channel, author: authorUser } = msg;

    const prefix = '$';
    const args = msg.content.slice(prefix.length).trim().split(/\s+/);
    const user = msg.mentions.users.first() || await client.users.fetch(args[1]) || authorUser;

    if (user.id === '851569621106032651') {
        await channel.send('I have all the trophies :sunglasses:');
        return;
    }

    if (user.bot) {
        await channel.send("Bots can't get trophies.");
        return;
    }

    const responseEmbed = new Discord.MessageEmbed()
    const trophies = getUserTrophies(user.id);
    if (trophies.length > 0) {
        responseEmbed
            .setTitle(user.username + "'s trophies")
            .setColor('#ede76b')
            .setDescription('Here are the trophies you recieved from the creator (lucky you):')
            .setTimestamp();
        addUserTrophiesEmbedField(responseEmbed, user.id);
    } else {
        responseEmbed
            .setTitle('Trophies 🏆')
            .setColor('#ede76b')
            .setDescription("What are trophies? Trophies are special little touch to this bot. If you are lucky enough to recieve a trophy from the creator, it will appear on your profile. Trophies aren't easy to get though because they are hard coded into the bot. The creator will give one to you if he thinks you deserve it.")
            .addField("If you're seeing this:", "This means you don't have any trophies or the user you mentioned doesn't have any trophies. Tough luck.")
            .setTimestamp();
    }

    switch(user.id) {
        case '527523815660453889':
            responseEmbed.addField('🏆 Trophies (gifted by owner):', "⚙️ Bot Dev\n😎 Epic Person");
            break;

        case '481591703959240706':
            responseEmbed.addField('🏆 Trophies (gifted by owner):', "<:priz:851844756488585266> PRIZ ;]\n💻 Coder Man");
            break;

        case '271045041487740940':
            responseEmbed.addField('🏆 Trophies (gifted by owner):', "⚙️ Early Tester\n💠 Cool Dude v2");
            break;

        case '235833960364638219':
            responseEmbed.addField('🏆 Trophies (gifted by owner):', "⚙️ Early Tester");
            break;

        case '743256356533960754':
            responseEmbed.addField('🏆 Trophies (gifted by owner):', "⚙️ Early Tester\n💛 Big Pee");
            break;

        default:
            // the user does not have any trophies
            return channel.send(noTrophiesEmbed);
    }

    channel.send(responseEmbed);
};

module.exports = {
    getUserTrophies,
    addUserTrophiesEmbedField,
    trophiesCmd,
};
