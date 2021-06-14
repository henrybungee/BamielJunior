const Discord = require('discord.js');

module.exports = (client, msg) => {
	const embed = new Discord.MessageEmbed()
		.setTitle("Trophies 🏆")
		.setColor("#ede76b")
		.setDescription("What are trophies? Trophies are special little touch to this bot. If you are lucky enough to recieve a trophy from the creator, it will appear on your profile. Trophies aren't easy to get though because they are hard coded into the bot. The creator will give one to you if he thinks you deserve it.")
		.addField("If you're seeing this:", "This means you don't have any trophies or the user you mentioned doesn't have any trophies. Tough luck.")
		.setTimestamp();

	//trophies

	var user = msg.mentions.users.first();

	if (!user) {
		user = msg.author;
	}

	const profile = new Discord.MessageEmbed()
		.setTitle(user.username + "'s trophies")
		.setColor("#ede76b")
		.setDescription("Here are the trophies you recieved from the creator (lucky you):")
		.setTimestamp();


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

	if (user.id === "743256356533960754" || user.id === "235833960364638219" || user.id === "271045041487740940" || user.id === "481591703959240706" || user.id === "527523815660453889") {
		msg.channel.send(profile);
	}

	else {
		msg.channel.send(embed);
	}
}