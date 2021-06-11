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

	if (msg.content.startsWith(prefix + 'ping') && !userBlacklisted) {
		return ping(client, msg);
	}

	if (msg.content.startsWith(prefix + 'setbc') && !userBlacklisted) {
			return setbandcamp(client, msg);
	}

	if (msg.content.startsWith(prefix + 'bc') && !userBlacklisted) {
			return viewbc(client, msg);
	}

	if (msg.content.startsWith(prefix + 'setyt') && !userBlacklisted) {
			return setyt(client, msg);
	}

	if (msg.content.startsWith(prefix + 'yt') && !userBlacklisted) {
			return viewyt(client, msg);
	}
	
	if (msg.content.startsWith(prefix + 'setname') && !userBlacklisted) {
			return setname(client, msg);
	}

	if (msg.content.startsWith(prefix + 'profile') || msg.content.startsWith(prefix + 'p ') || msg.content.replace(/\s/g, "") === prefix + 'p' && !userBlacklisted) {
			return viewprofile(client, msg);
	}

	if (msg.content.startsWith(prefix + 'setd ') && !userBlacklisted) {
			return setdesc(client, msg);
	}

	if (msg.content.startsWith(prefix + 'daw') && !userBlacklisted) {
			return viewdaw(client, msg);
	}

	if (msg.content.startsWith(prefix + "setdaw") && !userBlacklisted) {
			return setdaw(client, msg);
	}

	if (msg.content.startsWith(prefix + "setsc") && !userBlacklisted) {
			return setsc(client, msg);
	}

	if (msg.content.startsWith(prefix + "sc") && !userBlacklisted) {
			return viewsc(client, msg);
	}

	if (msg.content.startsWith(prefix + "setcolor") && !userBlacklisted) {
			return setprofilecolor(client, msg);
	}

	if (msg.content.startsWith(prefix + "setlt") && !userBlacklisted) {
			return settreelink(client, msg);
	}

	if (msg.content.startsWith(prefix + "setspotify") && !userBlacklisted) {
			return setspotify(client, msg);
	}

	if (msg.content.startsWith(prefix + "spotify") && !userBlacklisted) {
			return viewspotify(client, msg);
	}

	if (msg.content.startsWith(prefix + "setcustom") && !userBlacklisted) {
			return setcustomlink(client, msg);
	}

	if (msg.content.startsWith(prefix + "setrpchannel") && !userBlacklisted) {
			return setreportchannel(client, msg);
	}

	if (msg.content.startsWith(prefix + "report") && !userBlacklisted) {
			return report(client, msg);
	}

	if (msg.content.startsWith(prefix + "rchannel") && !userBlacklisted) {
			return reportchannel(client, msg);
	}

	if (msg.content.startsWith(prefix + "help") && !userBlacklisted) {
			return help(client, msg);
	}

	if (msg.content.startsWith(prefix + "trophies") && !userBlacklisted) {
			return trophies(client, msg);
	}

	if (msg.content.startsWith(prefix + "setfav") && !userBlacklisted) {
			return setfav(client, msg);
	}

	if (msg.content.startsWith(prefix + "blacklist") && !userBlacklisted) {
			return blacklist(client, msg);
	}  
}