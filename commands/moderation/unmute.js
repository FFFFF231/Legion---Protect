
module.exports = {
name:"unmute",
aliases:[],
run: async (client,message,args)=>{
 if(!message.member.permissions.has("MODERATE_MEMBERS")) return;
 const user = message.mentions.members.first();
 if(!user) return message.reply("Mentionne un utilisateur.");
 await user.timeout(null);
 message.channel.send(`${user.user.tag} unmute.`);
}
}
