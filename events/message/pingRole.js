module.exports = {
    name: "messageCreate",

    run: async (client, message) => {
        // Ignorer les bots et les messages en dehors des serveurs (DM)
        if (message.author.bot || !message.guild) return;

        // ID du salon spécifique
        const channelID = "1480274506231582750";
        if (message.channel.id !== channelID) return;

        // 1. Vérifier si le bot est mentionné
        if (!message.mentions.has(client.user)) return;

        // 2. Vérifier la présence de l'emoji drapeau
        if (!message.content.includes("🏳")) {
            return message.reply("Tu dois envoyer l'emoji 🏳️ avec ta mention pour recevoir le rôle.")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000)); // Auto-suppression après 5s
        }

        // 3. Récupérer le rôle par son nom (Attention aux emojis dans les noms)
        const roleName = "🏳️ ・MEMBRES LEGION";
        const role = message.guild.roles.cache.find(r => r.name === roleName);

        if (!role) {
            console.error(`[ERREUR] Le rôle "${roleName}" est introuvable sur le serveur.`);
            return message.reply("Le rôle est introuvable. Contacte un administrateur.");
        }

        // 4. Vérifier si l'utilisateur a déjà le rôle
        if (message.member.roles.cache.has(role.id)) {
            return message.reply("Tu possèdes déjà ce rôle !").then(msg => setTimeout(() => msg.delete().catch(() => {}), 3000));
        }

        // 5. Tentative d'ajout du rôle avec gestion d'erreur (Hiérarchie)
        try {
            await message.member.roles.add(role);
            await message.reply("✅ Bienvenue ! Tu as reçu ton rôle.");
        } catch (error) {
            console.error("[ERREUR ROLE]", error);
            message.reply("❌ Je n'ai pas pu te donner le rôle. Vérifie que mon rôle est bien **au-dessus** du rôle à donner dans les paramètres du serveur.");
        }
    }
}
