
module.exports = {
name:"unlockall",
aliases:[],
run: async (client,message)=>{
 if(!message.member.permissions.has("ADMINISTRATOR")) return;
 message.guild.channels.cache.forEach(c=>{
  if(c.isTextBased()){
   c.permissionOverwrites.edit(message.guild.roles.everyone,{SEND_MESSAGES:true}).catch(()=>{});
  }
 });
 message.channel.send("🔓 Tous les salons déverrouillés.");
}
}
