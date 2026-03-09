
module.exports = {
name: "kick",
aliases: [],
run: async (client, message, args) => {
 if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Permission refusée.");
 const user = message.mentions.members.first();
 if(!user) return message.reply("Mentionne un utilisateur.");
 const reason = args.slice(1).join(" ") || "Aucune raison";
 await user.kick(reason);
 message.channel.send(`${user.user.tag} a été expulsé.`);
}
}
