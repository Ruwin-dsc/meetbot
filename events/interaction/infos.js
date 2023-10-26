const Discord = require("discord.js");
const config = require('../../config.json')

const inten = {
    "Sérieux": {
        emoji: "🍒",
        color: "Red"
    },
    "Connaissance": {
        emoji: "🍇",
        color: "Purple"
    },
    "Plan Q": {
        emoji: "🍉",
        color: "Green"
    },
    "Coup d'un soir": {
        emoji: "🍑",
        color: "Orange"
    },
    "Non défini": {
        emoji: ":x:",
        color: null
    }
}

module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    let age2;
    if(interaction.customId == "infos") {
        bot.db.query(`SELECT * FROM user WHERE userId = "${interaction.user.id}"`, async (err, req) => {
        if(req.length < 1) {
        bot.db.query(`INSERT INTO user (userId) VALUES (?)`, [interaction.user.id])
        interaction.reply({ content: `Création de profil réussi !`, ephemeral: true })
        } else {
            const intention = req[0].intention || "Non défini"
            const photo = req[0].photo

            const embed = new Discord.EmbedBuilder()
            .setTitle(inten[intention].emoji)
            .setColor(inten[intention].color)
            .setThumbnail(photo)
            .setDescription(
                `**__Infos d'un utilisateur__**\n\n` +
                `> \`Envoies disponibles : \` ${req[0].envoiedispo}\n\n` +
                `> \`Demandes disponibles :\` ${req[0].demandedispo}\n\n` +
                `> \`Demandes envoyées :\` ${req[0].demandeenvoie}\n\n` +
                `> \`Matchs :\` ${req[0].Matchs}\n\n` +
                `> \`Likes reçus :\` ${req[0].coeur}`
            )

            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    })
}
  }}