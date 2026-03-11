require("dotenv").config();
const { bot } = require("./structures/client");

// 🛡️ SÉCURITÉ JSON : On intercepte les erreurs de l'auto-updateur et des API instables
const originalParse = JSON.parse;
JSON.parse = function(text) {
    // Si le texte est indéfini, vide, ou n'est pas une chaîne de caractères
    if (typeof text !== 'string' || !text || text === "undefined" || text === "null") {
        return {}; // On renvoie un objet vide pour éviter le crash .parse
    }
    
    try {
        return originalParse.apply(this, arguments);
    } catch (e) {
        // Si le JSON est mal formé (ex: une page d'erreur HTML au lieu de JSON)
        return {}; 
    }
};

// On lance le bot
const client = new bot();

// 🚧 ANTI-CRASH RADICAL
process.on("unhandledRejection", (reason) => {
    const errorStr = reason?.toString() || "";

    // On bloque tout ce qui concerne le JSON invalide et le soutien
    if (
        errorStr.includes("SyntaxError") || 
        errorStr.includes("JSON") || 
        errorStr.includes("undefined") ||
        errorStr.includes("soutien.map")
    ) {
        return; // On ne loggue rien du tout
    }

    console.error("[antiCrash] Erreur critique :", reason);
});

process.on("uncaughtException", (err) => {
    const errorStr = err?.toString() || "";
    if (errorStr.includes("SyntaxError") || errorStr.includes("JSON") || errorStr.includes("soutien.map")) return;
    console.error("[antiCrash] Exception critique :", err);
});
