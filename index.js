require("dotenv").config()

const { bot } = require("./structures/client")

new bot()

process.on("unhandledRejection", console.error)
process.on("uncaughtException", console.error)
