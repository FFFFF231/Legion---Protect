
module.exports = {
name:"warn",
aliases:[],
run: async (client,message,args)=>{
 if(!message.member.permissions.has("KICK_MEMBERS")) return;
 const user = message.mentions.members.first();
 if(!user) return;
 const reason = args.slice(1).join(" ")||"Aucune raison";
 message.channel.send(`${user.user.tag} averti. Raison: ${reason}`);
}
}
