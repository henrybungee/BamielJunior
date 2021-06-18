const Discord = require('discord.js');
const fs = require('fs');
const readline = require('readline');
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

	let prefix = "$";
	let userBlacklisted = false;

	//blacklist stuff
	let dir = './blacklist.txt';

	if (msg.content.startsWith(prefix)) {
		fs.readFileSync(dir, 'utf-8').split(/\r?\n/).forEach(function(line){
			if (msg.author.id === line) {
				userBlacklisted = true
				return msg.channel.send("You are blacklisted from using me!");
			}
		});
	}

	if (msg.content.toLowerCase().includes("among us")) {
		msg.channel.send("sussy");
	}

	if (msg.channel.type === 'dm' && !msg.author.bot) {
		return msg.channel.send("I don't work in DMs! Use me in a server.")
	}

	if(userBlacklisted)
        return

    switch(msg.content.split(" ")[0].split(prefix)[1]) {
        case "ping":
            ping(client, msg);
            break;

        case "setbc":
        case "setbandcamp": // Easy aliases
            setbandcamp(client, msg);
            break;

        case "setyt":
        case "setyoutube":
            setyt(client, msg);
            break;

        case "setname":
            setname(client, msg);
            break;

        case "profile":
        case "p":
            viewprofile(client, msg);
            break;

        case "setd":
        case "setdesc":
        case "setdescription":
        case "setbio":
            setdesc(client, msg);
            break;

        case "setdaw":
            setdaw(client, msg);
            break;

        case "setsc":
        case "setsoundcloud":
        case "setscloud":
            setsc(client, msg);
            break;

        case "setcolor":
        case "sethex":
            setprofilecolor(client, msg);
            break;

        case "setlt":
        case "setlinktree":
            settreelink(client, msg);
            break;

        case "setsp":
        case "setspotify":
            setspotify(client, msg);
            break;

        case "setcustom":
        case "setwebsite":
            setcustomlink(client, msg);
            break;

        case "setrchannel":
        case "setreportchannel":
        case "setreportingchannel":
            reportchannel(client, msg);
            break;

        case "setfav":
            setfav(client, msg);
            return

        case "?":
        case "help":
            help(client, msg);
            break;

        case "bc":
        case "bandcamp":
            viewbc(client, msg);
            break;

        case "yt":
        case "youtube":
            viewyt(client, msg);
            break;

        case "daw":
            viewdaw(client, msg);
            break;

        case "sc":
        case "soundcloud":
            viewsc(client, msg);
            break;

        case "report":
            report(client, msg);
            break;

        case "sp":
        case "spotify":
            viewspotify(client, msg);
            break;

        case "trophies":
            trophies(client, msg);
            break;

        case "rchannel":
        case "reportchannel":
        case "reportingchannel":
            reportchannel(client, msg);
            break;

        case "list":
        case "blacklisted":
        case "listbanned":
            listbanned(client, msg);
            break;

        case "feedback":
        case "feature":
            feedback(client, msg);
            break;

        case "blacklist":
            blacklist(client, msg);
            break;
    }
}
