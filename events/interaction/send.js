const Discord = require("discord.js");
const config = require('../../config.json');

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
    if(interaction.customId == "send") {
        bot.db.query(`SELECT * FROM user WHERE userId = "${interaction.user.id}"`, async (err, req) => {
        if(req.length < 1) {
        bot.db.query(`INSERT INTO user (userId) VALUES (?)`, [interaction.user.id])
        interaction.reply({ content: `Création de profil réussi !`, ephemeral: true })
        } else {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`Veuillez compléter votre profil !`)
            .setColor('Red')
            if(!req[0].prenom) return interaction.reply({ embeds: [embed], ephemeral: true })
            if(!req[0].intention) return interaction.reply({ embeds: [embed], ephemeral: true })
            if(!req[0].photo) return interaction.reply({ embeds: [embed], ephemeral: true })

            const embed2 = new Discord.EmbedBuilder()
            .setDescription(`Vous n'avez plus d'envoie disponible ! !`)
            .setColor('Red')
            if(req[0].envoiedispo == "0") return interaction.reply({ embeds: [embed2], ephemeral: true })

            const prenom = req[0].prenom || "Non défini"
            const age = req[0].age || "Non défini"
            if(age) {
                if(req[0].age >= 18) age2 = "Oui - "
                else age2 = "Non - "
            }
            const sexe = req[0].sexe || "Non défini"
            const orientation = req[0].orientation || "Non défini"
            const intention = req[0].intention || "Non défini"
            const biographie = req[0].biographie || "Non défini"
            const photo = req[0].photo

            const embed3 = new Discord.EmbedBuilder()
            .setTitle(inten[intention].emoji)
            .setColor(inten[intention].color)
            .setThumbnail(photo)
            .setDescription(
                `**__Profil d'un utilisateur__**\n` +
                `\n` +
                `> \`Prénom\` : ${prenom}\n\n` +
                `> \`Majeur\` : ${age2}${age}\n\n` +
                `> \`Sexe\` : ${sexe}\n\n` +
                `> \`Orientation\` : ${orientation}\n\n` +
                `> \`Intention\` : ${intention}\n\n` +
                `**__Biographie__**\n` +
                `\`\`\` ${biographie} \`\`\``
            )


            const botton1 = new Discord.ButtonBuilder()
            .setLabel(`Demande`)
            .setCustomId('demande')
            .setStyle(Discord.ButtonStyle.Primary)

            const botton2 = new Discord.ButtonBuilder()
            .setLabel(`❤️`)
            .setCustomId('like')
            .setStyle(Discord.ButtonStyle.Secondary)

            const row = new Discord.ActionRowBuilder().addComponents(botton1, botton2)
            if(sexe == "Homme") {
            interaction.guild.channels.cache.get(config.salonhomme).send({ content: `${interaction.user}`, embeds: [embed3], components: [row] })
            } else {
            interaction.guild.channels.cache.get(config.salonfemme).send({ content: `${interaction.user}`, embeds: [embed3], components: [row] })
            }

            const embed4 = new Discord.EmbedBuilder()
            .setDescription(`Votre profil a été envoyé !`)
            .setColor('Green')
            interaction.reply({ embeds: [embed4], ephemeral: true })
        }
        })
    }
}}