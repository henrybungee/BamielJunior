const ping = require('../commands/ping');
const setbandcamp = require('../commands/setbandcamp');
const viewbc = require('../commands/viewbc');
const setyt = require('../commands/setyt');
const viewyt = require('../commands/viewyt');
const setname = require('../commands/setname');
const viewprofile = require('../commands/viewprofile');
const setdesc = require('../commands/setdesc');
const viewdaw = require('../commands/viewdaw');
const setdaw = require('../commands/setdaw');
const setsc = require('../commands/setsc');
const viewsc = require('../commands/viewsc');
const setprofilecolor = require('../commands/setprofilecolor');
const settreelink = require('../commands/settreelink');
const setspotify = require('../commands/setspotify');
const viewspotify = require('../commands/viewspotify');
const setcustomlink = require('../commands/setcustomlink');
const setreportchannel = require('../commands/setreportchannel');
const report = require('../commands/report');
const reportchannel = require('../commands/reportchannel');
const help = require('../commands/help');
const trophies = require('../commands/trophies');
const setfav = require('../commands/setfav');
const blacklist = require('../commands/blacklistuser');
const listbanned = require('../commands/listbanned');
const feedback = require('../commands/featurerecommend');

module.exports = async (client, msg) => {
    const cmdPrefix = '!';
    if (!msg.content.startsWith(cmdPrefix)) {
        return;
    }

    const { channel, author: authorUser } = msg;

    if ((await blacklist.getBlacklistedUserIds()).indexOf(authorUser.id) >= 0) {
        await channel.send('You are blacklisted from using me!');
        return;
    }

    if (channel.type === 'dm' && !authorUser.bot) {
        await channel.send("I don't work in DMs! Use me in a server.");
        return;
    }

    switch (msg.content.split(/\s+/, 1)[0].slice(cmdPrefix.length)) {
        case 'ping':
            ping(client, msg);
            break;

        case 'setbc':
        case 'setbandcamp': // Easy aliases
            setbandcamp(client, msg);
            break;

        case 'setyt':
        case 'setyoutube':
            setyt(client, msg);
            break;

        case 'setname':
            setname(client, msg);
            break;

        case 'profile':
        case 'p':
            await viewprofile(client, msg);
            break;

        case 'setd':
        case 'setdesc':
        case 'setdescription':
        case 'setbio':
            setdesc(client, msg);
            break;

        case 'setdaw':
            setdaw(client, msg);
            break;

        case 'setsc':
        case 'setsoundcloud':
        case 'setscloud':
            setsc(client, msg);
            break;

        case 'setcolor':
        case 'sethex':
            setprofilecolor(client, msg);
            break;

        case 'setlt':
        case 'setlinktree':
            settreelink(client, msg);
            break;

        case 'setsp':
        case 'setspotify':
            setspotify(client, msg);
            break;

        case 'setcustom':
        case 'setwebsite':
        case 'setcustomlink':
            setcustomlink(client, msg);
            break;

        case 'setrchannel':
        case 'setreportchannel':
        case 'setreportingchannel':
            setreportchannel(client, msg);
            break;

        case 'setfav':
        case 'setfavartist':
        case 'setfavoriteartist':
            setfav(client, msg);
            break;

        case '?':
        case 'help':
            help(client, msg);
            break;

        case 'bc':
        case 'bandcamp':
            viewbc(client, msg);
            break;

        case 'yt':
        case 'youtube':
            viewyt(client, msg);
            break;

        case 'daw':
        case 'd':
            viewdaw(client, msg);
            break;

        case 'sc':
        case 'soundcloud':
            viewsc(client, msg);
            break;

        case 'report':
        case 'r':
            report(client, msg);
            break;

        case 'sp':
        case 'spotify':
            viewspotify(client, msg);
            break;

        case 'trophies':
        case 't':
            await trophies.trophiesCmd(client, msg);
            break;

        case 'rchannel':
        case 'reportchannel':
        case 'reportingchannel':
            reportchannel(client, msg);
            break;

        case 'list':
        case 'blacklisted':
        case 'listbanned':
        case 'banlist':
            await listbanned(client, msg);
            break;

        case 'feedback':
        case 'feature':
            await feedback(client, msg);
            break;

        case 'blacklist':
        case 'b':
            await blacklist.blacklistCmd(client, msg);
            break;
    }
};
