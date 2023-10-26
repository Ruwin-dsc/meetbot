const Discord = require("discord.js");
const config = require('../../config.json')

module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    if(interaction.customId == "like") {
        bot.db.query(`SELECT * FROM user WHERE userId = "${interaction.user.id}"`, async (err, req) => {
        if(req.length < 1) {
        interaction.reply({ content: `Veuillez créer votre profil pour envoyer une demande !`, ephemeral: true })
        } else {
            const embed = new Discord.EmbedBuilder()
            .setDescription(`Veuillez compléter votre profil !`)
            .setColor('Red')
            if(!req[0].prenom) return interaction.reply({ embeds: [embed], ephemeral: true })
            if(!req[0].intention) return interaction.reply({ embeds: [embed], ephemeral: true })
            if(!req[0].photo) return interaction.reply({ embeds: [embed], ephemeral: true })

            const user = await bot.users.fetch(interaction.message.content.replace(/<@|>/g, ''))
        
            //if(user.id == interaction.user.id) return interaction.reply({ content: "Vous ne pouvez pas vous liker vous même", ephemeral: true }) a enlevé si vous voulez

                bot.db.query(`SELECT * FROM likes WHERE userId = "${user.id}" AND authordId = "${interaction.user.id}"`, async (err, req) => {
                    if(req.length < 1) {
                        bot.db.query(`INSERT INTO likes (userId, authordId) VALUES (?, ?)`, [user.id, interaction.user.id])
                        bot.db.query(`UPDATE user SET coeur = coeur + 1 WHERE userId = ${user.id}`);
                        interaction.reply({ content: `Vous avez liker ce profil !`, ephemeral: true })
                    } else {
                        interaction.reply({ content: `Vous avez déjà liké ce profil !`, ephemeral: true })
                    }
                })
        }
        })
    }
  }
}