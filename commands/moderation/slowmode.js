
module.exports = {
name:"slowmode",
aliases:["slow"],
run: async (client,message,args)=>{
 if(!message.member.permissions.has("MANAGE_CHANNELS")) return;
 const time = parseInt(args[0]);
 if(isNaN(time)) return message.reply("Temps invalide.");
 await message.channel.setRateLimitPerUser(time);
 message.channel.send(`⏱ Slowmode: ${time}s`);
}
}
