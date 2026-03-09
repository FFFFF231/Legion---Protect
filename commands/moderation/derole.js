
module.exports = {
name:"derole",
aliases:[],
run: async (client,message,args)=>{
 if(!message.member.permissions.has("MANAGE_ROLES")) return;
 const user = message.mentions.members.first();
 const role = message.mentions.roles.first();
 if(!user||!role) return;
 await user.roles.remove(role);
 message.channel.send("Role retiré.");
}
}
