module.exports = {
name: "guildMemberAdd",

run: async (client, member) => {

const role = member.guild.roles.cache.find(r => r.name === "🎯・ RANDOM")

if(!role) return console.log("Role 🎯・ RANDOM introuvable")

try{

await member.roles.add(role)

console.log(`${member.user.tag} a reçu le rôle 🎯・ RANDOM`)

}catch(err){

console.error("Impossible de donner le rôle :", err)

}

}
}