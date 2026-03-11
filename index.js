require("dotenv").config();
// Force Quick.db à utiliser sqlite3 pour éviter l'erreur ELF Header sur Railway
process.env.QUICKDB_DRIVER = "sqlite3"; 

const { bot } = require("./structures/client");

// 🛡️ SÉCURITÉ JSON : On intercepte les erreurs
const originalParse = JSON.parse;
JSON.parse = function(text) {
    if (typeof text !== 'string' || !text || text === "undefined" || text === "null") {
        return {}; 
    }
    try {
        return originalParse.apply(this, arguments);
    } catch (e) {
        return {}; 
    }
};

// On lance le bot
const client = new bot();

// 🚧 ANTI-CRASH RADICAL
process.on("unhandledRejection", (reason) => {
    const errorStr = reason?.toString() || "";
    if (
        errorStr.includes("SyntaxError") || 
        errorStr.includes("JSON") || 
        errorStr.includes("undefined") ||
        errorStr.includes("soutien.map")
    ) {
        return; 
    }
    console.error("[antiCrash] Erreur critique :", reason);
});

process.on("uncaughtException", (err) => {
    const errorStr = err?.toString() || "";
    if (errorStr.includes("SyntaxError") || errorStr.includes("JSON") || errorStr.includes("soutien.map")) return;
    console.error("[antiCrash] Exception critique :", err);
});
