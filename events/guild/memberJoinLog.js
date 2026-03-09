module.exports = {
name: "guildMemberAdd",

run: async (client, member) => {

const channel = member.guild.channels.cache.get("1480272744607121662")
if(!channel) return

// récupérer nombre de fois que l'utilisateur a rejoint
let joins = await client.db.get(`joins_${member.id}`) || 0
joins++

await client.db.set(`joins_${member.id}`, joins)

// timestamp création compte
const created = Math.floor(member.user.createdTimestamp / 1000)

// nombre membres
const members = member.guild.memberCount

channel.send(
`${member} vient de nous rejoindre pour la **${joins}e fois**, son compte a été créé <t:${created}:R>. Il/Elle a été invité(e) par le **lien d'invitation personnalisé du serveur**. Nous sommes désormais **${members}** !`
)

}
}