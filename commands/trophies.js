const Discord = require('discord.js');

module.exports = (client, msg) => {
	const embed = new Discord.MessageEmbed()
		.setTitle("Trophies 🏆")
		.setColor("#ede76b")
		.setDescription("What are trophies? Trophies are special little touch to this bot. If you are lucky enough to recieve a trophy from the creator, it will appear on your profile. Trophies aren't easy to get though because they are hard coded into the bot. The creator will give one to you if he thinks you deserve it.")
		.setTimestamp();

	msg.channel.send(embed);
}