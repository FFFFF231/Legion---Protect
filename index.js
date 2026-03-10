require("dotenv").config();
const { bot } = require("./structures/client");

// 🔥 SÉCURITÉ ULTIME : On intercepte les erreurs JSON de l'auto-updateur fantôme
const originalParse = JSON.parse;
JSON.parse = function(text) {
    if (text === undefined || text === "undefined" || text === "") {
        console.log("🛡️ Tentative de lecture d'un JSON vide bloquée (autoUpdate/init)");
        return {}; // On renvoie un objet vide au lieu de crash
    }
    return originalParse.apply(this, arguments);
};

// On lance le bot
const client = new bot();

process.on("unhandledRejection", (reason) => {
    // Si l'erreur contient "JSON", on l'ignore car on l'a déjà gérée
    if (reason.toString().includes("SyntaxError")) return;
    console.error("[antiCrash] Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    if (err.toString().includes("SyntaxError")) return;
    console.error("[antiCrash] Uncaught Exception:", err);
});
