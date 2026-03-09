
module.exports = {
name: "unlock",
aliases: [],
run: async (client, message) => {
 if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("Permission refusée.");
 await message.channel.permissionOverwrites.edit(message.guild.roles.everyone,{ SEND_MESSAGES:true });
 message.channel.send("🔓 Salon déverrouillé.");
}
}
