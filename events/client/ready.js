module.exports = {
name: "ready",

run: async (client) => {

console.log(`✅ Connecté : ${client.user.tag}`)

// charger les invitations
for (const [guildId, guild] of client.guilds.cache) {

const invites = await guild.invites.fetch()

client.invites.set(guildId, invites)

}

}

}