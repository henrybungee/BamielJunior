const Discord = require('discord.js');
const fs = require('fs');

module.exports = (client, msg) => {
	let prefix = "$";
	var args = msg.content.slice(prefix.length).trim().split(/ +/g);
	let userArg = args.slice(1).join(" ");

	var user = msg.guild.members.cache.get(userArg);

	var check = client.emojis.cache.find(emoji => emoji.name === "tommycheck");

	if (!msg.member.hasPermission("ADMINISTRATOR")) {
		return msg.channel.send("You cannot perform this action. You don't have the `ADMINISTRATOR` permission.");
	}

	if (!userArg) {
		return msg.channel.send("Pass a user ID so we can blacklist them");
	}

	if (!user) {
		return msg.channel.send("Use a valid user ID");
	}

	if (userArg === msg.author.id) {
		return msg.channel.send("You can't blacklist yourself, silly");
	}

	msg.channel.send("⚠️ Careful there! Confirm that you want to blacklist **" +user.user.username+ "**. This is permanent.")
		.then((reactMessage) => {
			reactMessage.react('✅');
			reactMessage.react('❌');

			reactMessage.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 15000 }).then(collected => {
					if (collected.first().emoji.name == '✅') {

						fs.open('./blacklist.txt', 'a', 666, function(e, id ) {
							fs.write(id, user.id + '\n', null, 'utf8', function(){
								fs.close(id, function(){
								console.log('file is updated');
								});
							});
						});

						msg.channel.send("I'll blacklist **" +user.user.tag+ "**. This will not allow them to use the bot or to interact with anyone else with the bot. Their profile will also be inaccessible.");
						reactMessage.delete();
					}

					else {
						msg.channel.send('I will not blacklist this user.');
						reactMessage.delete();
					}

        }).catch(() => {
					reactMessage.delete();
					msg.channel.send('No reaction after 15 seconds, so I\'m gonna assume you don\'t wanna blacklist this user.');
        });

		})

}