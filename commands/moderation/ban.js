
module.exports = {
name: "ban",
aliases: [],
run: async (client, message, args) => {
 if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Permission refusée.");
 const user = message.mentions.members.first();
 if(!user) return message.reply("Mentionne un utilisateur.");
 const reason = args.slice(1).join(" ") || "Aucune raison";
 await user.ban({ reason });
 message.channel.send(`${user.user.tag} a été banni. Raison: ${reason}`);
}
}
