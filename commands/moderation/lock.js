
module.exports = {
name: "lock",
aliases: [],
run: async (client, message) => {
 if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("Permission refusée.");
 await message.channel.permissionOverwrites.edit(message.guild.roles.everyone,{ SEND_MESSAGES:false });
 message.channel.send("🔒 Salon verrouillé.");
}
}
