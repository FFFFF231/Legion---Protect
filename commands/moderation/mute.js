
module.exports = {
name:"mute",
aliases:[],
run: async (client,message,args)=>{
 if(!message.member.permissions.has("MODERATE_MEMBERS")) return;
 const user = message.mentions.members.first();
 if(!user) return message.reply("Mentionne un utilisateur.");
 const time = parseInt(args[1]) || 60000;
 await user.timeout(time);
 message.channel.send(`${user.user.tag} a été mute.`);
}
}
