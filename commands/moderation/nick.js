
module.exports = {
name:"nick",
aliases:[],
run: async (client,message,args)=>{
 if(!message.member.permissions.has("MANAGE_NICKNAMES")) return;
 const user = message.mentions.members.first();
 if(!user) return;
 const nick = args.slice(1).join(" ");
 if(!nick) return;
 await user.setNickname(nick);
 message.channel.send("Pseudo modifié.");
}
}
