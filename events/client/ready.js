module.exports = {
    name: "ready",

    run: async (client) => {
        console.log(`✅ Connecté : ${client.user.tag}`);

        // Sécurité pour les invitations
        for (const [guildId, guild] of client.guilds.cache) {
            try {
                const invites = await guild.invites.fetch();
                client.invites.set(guildId, invites);
            } catch (err) {
                // On ignore l'erreur si on n'a pas la permission de voir les invites
                continue;
            }
        }
    }
}
