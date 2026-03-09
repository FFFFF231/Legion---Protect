module.exports = {
name:"messageCreate",
async run(client,message){

if(message.author.bot) return

const prefix = client.config.prefix

if(!message.content.startsWith(prefix)) return

const args = message.content.slice(prefix.length).trim().split(/ +/)
const cmd = args.shift().toLowerCase()

const command = client.commands.get(cmd) || client.aliases.get(cmd)
if(!command) return

command.run(client,message,args)
}
}
