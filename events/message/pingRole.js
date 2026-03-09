module.exports = {
name: "messageCreate",

run: async (client, message) => {

if(message.author.bot) return

// ID du salon
const channelID = "1480274506231582750"

if(message.channel.id !== channelID) return

// vérifier ping bot
if(!message.mentions.has(client.user)) return

// vérifier emoji drapeau
if(!message.content.includes("🏳"))
return message.reply("Tu dois envoyer l'emoji 🏳️ pour recevoir le rôle.")

// récupérer le rôle
const role = message.guild.roles.cache.find(r => r.name === "🏳️ ・MEMBRES LEGION")

if(!role) return message.reply("Role introuvable.")

// donner rôle
await message.member.roles.add(role)

message.reply("✅ Tu as reçu le rôle.")

}
}