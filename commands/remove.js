const config = require('../config.json');
const Discord = require('discord.js');
const fs = require('fs');

const options = {

	name: 'remove',
	aliases: ['r', 'delete', 'd'],

	usage: '<@USER>',

	description: 'Removes a user from the verfied streamer list',

	cooldown: 3,
	minArgs: 1,

	roleRestrict: 'moderator',
};

async function execute(message, args, streamers) {

	// if no user mentioned
	if (!message.mentions.users.size) {
		const errEmbed = new Discord.RichEmbed().setColor(config.colors.error)
			.setTitle("Oops! User mention not recognised.")
			.addField("Usage:", `\`${config.prefix}${this.name} ${this.usage}\``);
		return message.channel.send(errEmbed);
	}

	const user = message.mentions.users.first();
	const member = await message.guild.fetchMember(user);

	console.log(`[ INFO ] Removing user ${user.username} from streamer list`);

	streamers.delete(user.id);

	// generate array from map, save it to file
	fs.writeFileSync('./streamers.json', JSON.stringify([...streamers], null, 2));

	const replyEmbed = new Discord.RichEmbed().setColor(config.colors.success)
		.setTitle(`Removed ${member ? member.displayName : user.username} from the streamer list.`);
	return message.channel.send(replyEmbed);

}

module.exports = options;
module.exports.execute = execute;
