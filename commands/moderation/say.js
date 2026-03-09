
module.exports = {
name:"say",
aliases:[],
run: async (client,message,args)=>{
 if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
 const msg = args.join(" ");
 if(!msg) return;
 message.delete().catch(()=>{});
 message.channel.send(msg);
}
}
