
module.exports = {
name: "announce",
aliases: ["annonce"],
run: async (client, message, args) => {
 if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Permission refusée.");
 const msg = args.join(" ");
 if(!msg) return message.reply("Écris une annonce.");
 message.channel.send("📢 **ANNONCE**\n\n" + msg);
}
}
