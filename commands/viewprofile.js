const Discord = require('discord.js');
path = require('path');
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

const fs = require('fs');

module.exports = (client, msg) => {

	let prefix = "%";
	let userBlacklisted = false;

	var args = msg.content.slice(prefix.length).trim().split(/ +/g);

	var userMention = msg.mentions.users.first();
	var id = args[1];
	var user;

	let yt = client.emojis.cache.find(emoji => emoji.name === "yt");
	let bandcampEmoji = client.emojis.cache.find(emoji => emoji.name === "bandcamp");
	let scEmoji = client.emojis.cache.find(emoji => emoji.name === "soundcloud");
	let spotEmoji = client.emojis.cache.find(emoji => emoji.name === "spotify");
	let priz = client.emojis.cache.find(emoji => emoji.name === "priz");


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

	if (user.user.bot) {
			return msg.channel.send("Bots don't have profiles so don't go lookin' for one");
	}

	function lineCount( text ) {
		var nLines = 0;
		for( var i = 0, n = text.length;  i < n;  ++i) {
			if( text[i] === '\n' ) {
					++nLines;
			}
		}
		return nLines;
	}

	var text = fs.readFileSync('./blacklist.txt', 'utf-8');

	const blacklistEmbed = new Discord.MessageEmbed()
		.setDescription("❌ This user is blacklisted! You cannot view their profile.");

	for (var i = 0; i < lineCount(text); i++) {
		if (user.id === text.split(/\r\n|\n/)[i]) {
			console.log("blacklist");
			return msg.channel.send(blacklistEmbed);
			break;
		}
	}

	const profile = new Discord.MessageEmbed()
			.setTitle(nameBotstorage[user.id] ? nameBotstorage[user.id] : user.user.username)
			.setColor(colorBotstorage[user.id] ? colorBotstorage[user.id] : "#303030")
			.setThumbnail(user.user.displayAvatarURL({dynamic: true}))
			.setDescription(descBotstorage[user.id] ? descBotstorage[user.id] : "No description set")
			.addField("DAW:", dawsBotstorage[user.id] ? dawsBotstorage[user.id] : "No DAW set")
			.addField(bandcampEmoji.toString() + " Bandcamp:", bcBotstorage[user.id] ? `[Click here](${bcBotstorage[user.id]})` : "No Bandcamp")
			.addField(yt.toString() + " Youtube:", ytBotstorage[user.id] ? `[Click here](${ytBotstorage[user.id]})` : "No Youtube")
			.addField(scEmoji.toString() + " Soundcloud:", scBotstorage[user.id] ? `[Click here](${scBotstorage[user.id]})` : "No Soundcloud")
			.addField(spotEmoji.toString() + " Spotify:", spotBotstorage[user.id] ? `[Click here](${spotBotstorage[user.id]})` : "No Spotify")
			.addField("Linktree:", ltBotstorage[user.id] ? `[Click here](${ltBotstorage[user.id]})` : "No Linktree")
			.setTimestamp();

	if (clBotstorage[user.id]) {
			profile.addField("Custom Link:", `[Click here](${clBotstorage[user.id]})`);
	}

	if (favBotstorage[user.id]) {
		profile.addField("Fav Musician: ", favBotstorage[user.id]);
	}

	//trophies
	if (user.id === "527523815660453889") {
			profile.addField("🏆 Trophies (gifted by owner):", "⚙️ Bot Dev\n😎 Epic Person");
	}

	if (user.id === "481591703959240706") {
			profile.addField("🏆 Trophies (gifted by owner):", priz.toString() + " PRIZ ;]\n💻 Coder Man");
	}

	if (user.id === "271045041487740940") {
			profile.addField("🏆 Trophies (gifted by owner):", "⚙️ Early Tester\n💠 Cool Dude v2");
	}

	if (user.id === "235833960364638219") {
			profile.addField("🏆 Trophies (gifted by owner):", "⚙️ Early Tester");
	}

	if (user.id === "743256356533960754") {
			profile.addField("🏆 Trophies (gifted by owner):", "⚙️ Early Tester\n💛 Big Pee");
	}

	msg.channel.send(profile);
}