
module.exports = {
name: "clear",
aliases: ["purge"],
run: async (client, message, args) => {
 if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("Permission refusée.");
 const amount = parseInt(args[0]);
 if(!amount || amount < 1 || amount > 100) return message.reply("Choisis un nombre entre 1 et 100.");
 await message.channel.bulkDelete(amount, true);
 const m = await message.channel.send(`🧹 ${amount} messages supprimés.`);
 setTimeout(()=>m.delete(),3000);
}
}
