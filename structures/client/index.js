const { Client, Collection, Intents } = require("discord.js")
const { QuickDB } = require("quick.db")
const fs = require("fs")

class bot extends Client {

    constructor(){

        super({
            intents:[
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_PRESENCES // Ajouté pour éviter des erreurs sur certains events
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

        // 🛡️ LISTE NOIRE : On ignore les dossiers qui font crash le bot
        const blacklist = ["init", "autoUpdate", "soutien"]

        for(const folder of folders){
            
            // Si le dossier est dans la blacklist, on l'ignore complètement
            if(blacklist.includes(folder)) {
                console.log(`🚫 Dossier ignoré : ${folder}`)
                continue
            }

            const files = fs.readdirSync(`./events/${folder}`).filter(f=>f.endsWith(".js"))

            for(const file of files){
                try {
                    const event = require(`../../events/${folder}/${file}`)
                    
                    if(event.name && event.run) {
                        this.on(event.name, (...args) => event.run(this, ...args))
                    }
                } catch (error) {
                    console.error(`⚠️ Erreur lors du chargement de l'event ${file} :`, error.message)
                }
            }
        }

        console.log("✅ Events chargés (Dossiers instables bloqués)")
    }

}

module.exports = { bot }
