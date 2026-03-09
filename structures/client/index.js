const { Client, Collection, Intents } = require("discord.js")
const { QuickDB } = require("quick.db")
const fs = require("fs")

class bot extends Client {

    constructor(){

        super({
            intents:[
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS
            ]
        })

        this.commands = new Collection()
        this.aliases = new Collection()
        this.db = new QuickDB()
        this.invites = new Map()

        this.config = require("../../config")

        this.loadCommands()
        this.loadEvents()

        this.once("ready",()=>{
            console.log(`✅ Connecté : ${this.user.tag}`)
        })

        this.login(process.env.TOKEN)
    }

    loadCommands(){

        const folders = fs.readdirSync("./commands")

        for(const folder of folders){

            const files = fs.readdirSync(`./commands/${folder}`).filter(f=>f.endsWith(".js"))

            for(const file of files){

                const command = require(`../../commands/${folder}/${file}`)

                this.commands.set(command.name,command)

                if(command.aliases){
                    command.aliases.forEach(a=>{
                        this.aliases.set(a,command)
                    })
                }
            }
        }

        console.log(`${this.commands.size} commandes chargées`)
    }

    loadEvents(){

        const folders = fs.readdirSync("./events")

        for(const folder of folders){

            const files = fs.readdirSync(`./events/${folder}`).filter(f=>f.endsWith(".js"))

            for(const file of files){

                const event = require(`../../events/${folder}/${file}`)

                this.on(event.name,(...args)=>event.run(this,...args))
            }
        }

        console.log("Events chargés")
    }

}

module.exports = { bot }
