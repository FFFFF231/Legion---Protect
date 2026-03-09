module.exports = {

name: "guildMemberAdd",

async run(client, member) {

let count = await client.db.get(`join_${member.guild.id}`) || 0

count++

await client.db.set(`join_${member.guild.id}`, count)

if(count >= 5){

member.guild.members.cache.forEach(m=>{
if(!m.user.bot && m.joinedTimestamp > Date.now()-10000){
m.kick("Anti raid")
}
})

client.db.set(`join_${member.guild.id}`,0)

}

setTimeout(()=>{
client.db.set(`join_${member.guild.id}`,0)
},10000)

}

}