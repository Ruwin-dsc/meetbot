const Discord = require("discord.js");
const config = require('../../config.json');
const message = require("../handler/message");

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
    if(interaction.customId == "demande") {
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
            if(req[0].demandedispo == "0") return interaction.reply({ content: `Vous n'avez plus de demande !`, ephemeral: true })

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

            const embed2 = new Discord.EmbedBuilder()
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

            const user = await bot.users.fetch(interaction.message.content.replace(/<@|>/g, ''))
        
            if(user.id == interaction.user.id) return interaction.reply({ content: "Vous ne pouvez pas vous demander vous même", ephemeral: true })
            bot.db.query(`SELECT * FROM matchDm WHERE userId = "${user.id}" AND authorId = "${interaction.user.id}"`, async (err, req) => {
             if(req.length < 1) {
                interaction.reply({ content: `Vous avez envoyé une demande`, ephemeral: true })
                bot.db.query(`INSERT INTO matchDm (userId, authorId) VALUES (?, ?)`, [user.id, interaction.user.id])

                const thread = await interaction.channel.threads.create({
                    name: `${user.username} + ${interaction.user.username}`,
                    autoArchiveDuration: 60,
                    type: Discord.ChannelType.PrivateThread,
                    reason: 'Match',
                });

                const botton1 = new Discord.ButtonBuilder()
                .setLabel(`Accepter`)
                .setCustomId('acceptMatch')
                .setStyle(Discord.ButtonStyle.Success)

                const botton2 = new Discord.ButtonBuilder()
                .setLabel(`Refuser`)
                .setCustomId('denyMatch')
                .setStyle(Discord.ButtonStyle.Danger)

                const row = new Discord.ActionRowBuilder().addComponents(botton1, botton2)

                thread.send({ content: `${interaction.user.id}`, embeds: [embed2], components: [row]})
                thread.send({ content: `<@${interaction.message.content.replace(/<@|>/g, '')}>`})
                await thread.members.add(interaction.message.content.replace(/<@|>/g, ''));
                bot.db.query(`UPDATE user SET demandedispo = demandedispo - 1 WHERE userId = ${interaction.user.id}`);
              } else {
                  interaction.reply({ content: `Vous avez déjà demandé ce profil`, ephemeral: true })
              }
            })
            
        }
    })
} else if(interaction.customId == "acceptMatch") {
    bot.db.query(`UPDATE user SET Matchs = Matchs + 1 WHERE userId = ${interaction.message.content}`);
    bot.db.query(`UPDATE user SET Matchs = Matchs + 1 WHERE userId = ${interaction.user.id}`);

    const user = interaction.guild.members.cache.get(interaction.message.content)
    if(!user) return

    interaction.update({ content: `<@${interaction.message.content}> Match ! `, components: [], embeds: []})
    const thread = interaction.channel
    thread.send(`<@${interaction.message.content}>`)
} else if(interaction.customId == "denyMatch") {
    interaction.update({ content: `Vous avez refuser le match le fil va se supprimer dans quelques secondes...`, components: [], embeds: [] })
    const user = interaction.guild.members.cache.get(interaction.message.content)
    if(!user) return
    const thread = interaction.channel;
    thread.delete()
}
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}