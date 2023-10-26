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
    if(interaction.customId == "profil") {
        bot.db.query(`SELECT * FROM user WHERE userId = "${interaction.user.id}"`, async (err, req) => {
        if(req.length < 1) {
        bot.db.query(`INSERT INTO user (userId) VALUES (?)`, [interaction.user.id])
        interaction.reply({ content: `Création de profil réussi !`, ephemeral: true })
        } else {
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

            const embed = new Discord.EmbedBuilder()
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
            .setLabel(`Modifier son profil`)
            .setCustomId('editprofil')
            .setStyle(Discord.ButtonStyle.Primary)

            const botton2 = new Discord.ButtonBuilder()
            .setLabel(`Modifier sa photo de profil`)
            .setCustomId('editphotoprofil')
            .setStyle(Discord.ButtonStyle.Primary)

            const botton3 = new Discord.ButtonBuilder()
            .setLabel(`Modifier ses intentions`)
            .setCustomId('editintention')
            .setStyle(Discord.ButtonStyle.Primary)

            const row = new Discord.ActionRowBuilder().addComponents(botton1, botton2, botton3)
            
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
            
        }
        })
    } else if(interaction.customId == "editprofil") {
        const modal = new Discord.ModalBuilder()
        .setCustomId('profilModal')
        .setTitle('Modifier son profil');

        const prenom = new Discord.TextInputBuilder()
        .setCustomId('prenom')
        .setLabel("Prénom")
        .setMaxLength(20)
        .setPlaceholder(`Indique ton prénom`)
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(true);

        const age = new Discord.TextInputBuilder()
        .setCustomId('age')
        .setLabel("Age")
        .setMaxLength(2)
        .setMinLength(2)
        .setPlaceholder(`Indique ton âge`)
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(true);

        const sexe = new Discord.TextInputBuilder()
        .setCustomId('sexe')
        .setLabel("Sexe")
        .setMaxLength(5)
        .setMinLength(5)
        .setPlaceholder(`Homme / Femme`)
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(true);

        const orientation = new Discord.TextInputBuilder()
        .setCustomId('orientation')
        .setLabel("Orientation sexuelle")
        .setMaxLength(10)
        .setMinLength(2)
        .setPlaceholder(`Hétéro / Bi / Homosexuel / Lesbienne`)
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(true);

        const biographie = new Discord.TextInputBuilder()
        .setCustomId('biographie')
        .setLabel("Biographie")
        .setMaxLength(200)
        .setPlaceholder(`Modifie ta biographie`)
        .setStyle(Discord.TextInputStyle.Paragraph)
        .setRequired(false);

        modal.addComponents(new Discord.ActionRowBuilder().addComponents(prenom), new Discord.ActionRowBuilder().addComponents(age), new Discord.ActionRowBuilder().addComponents(sexe), new Discord.ActionRowBuilder().addComponents(orientation), new Discord.ActionRowBuilder().addComponents(biographie))

        await interaction.showModal(modal);
    } else if(interaction.customId == "profilModal") {
        const prenom = interaction.fields.getTextInputValue('prenom')
        const age = interaction.fields.getTextInputValue('age')
        if(!Number(age) || age <= 13) return
        const sexe = interaction.fields.getTextInputValue('sexe')
        if(sexe !== "Homme" && sexe !== "Femme") return 
        const orientation = interaction.fields.getTextInputValue('orientation')
        const biographie = interaction.fields.getTextInputValue('biographie')

        if(!biographie) {
            bot.db.query(`UPDATE user SET prenom = ?, age = ?, sexe = ?, orientation = ? WHERE userId = ${interaction.user.id}`, [prenom, age, sexe, orientation]);
        } else {
            bot.db.query(`UPDATE user SET prenom = ?, age = ?, sexe = ?, orientation = ?, biographie = ? WHERE userId = ${interaction.user.id}`, [prenom, age, sexe, orientation, biographie]);
        }

        interaction.update({ content: `Vous avez bien modifié votre profil`})
    } else if(interaction.customId == "editphotoprofil") {
        const filter = (m) => m.author.id === interaction.user.id
        const embed = new Discord.EmbedBuilder()
        .setColor('Green')
        .setDescription(`Envoyez votre nouvelle image de profil`)
        const msg = await interaction.reply({ embeds: [embed], ephemeral: true })
        interaction.channel.awaitMessages({ filter, max: 1, time: 240000, errors: ["time"] }).then(async (collected) => {
            interaction.channel.permissionOverwrites.set([
            {
                id: interaction.user.id,
                allow: [Discord.PermissionsBitField.Flags.SendMessages],
            }
            ]);
                
            if(collected.first().attachments.first() < 0) {
                const error = new Discord.EmbedBuilder()
                .setColor('Red')
                .setDescription(`Veuillez mettre une image correcte !`)
                collected.first().delete()
                interaction.channel.permissionOverwrites.set([
                {
                    id: interaction.user.id,
                    deny: [Discord.PermissionsBitField.Flags.SendMessages],
                }
                ]);
                return msg.edit({ embeds: [error] })
            } else {
                bot.db.query(`UPDATE user SET photo = ? WHERE userId = ${interaction.user.id}`, [collected.first().attachments.first().url]);
                collected.first().delete()
                const error = new Discord.EmbedBuilder()
                .setColor('Green')
                .setDescription(`L'image a été enregistré !`)
                interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.user.id,
                        deny: [Discord.PermissionsBitField.Flags.SendMessages],
                    }
                ]);
                return msg.edit({ embeds: [error] }).then(e => { })
            }
        }).catch(e => {
            const error = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription(`Veuillez mettre une image correcte !`)
            interaction.channel.permissionOverwrites.set([
                {
                    id: interaction.user.id,
                    deny: [Discord.PermissionsBitField.Flags.SendMessages],
                }
            ]);
            msg.edit({ embeds: [error] })
        })
    } else if(interaction.customId == "editintention") {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`Séléctionne ci-dessous le type de rencontre que tu souhaites faire !`)
        .setColor('Green')

        const embedMenu = new Discord.StringSelectMenuBuilder()
            .setCustomId('rencontre')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Choix de rencontre")
            .addOptions(
                new Discord.StringSelectMenuOptionBuilder()
                .setDescription(`Sérieux`)
                .setValue("serious")
                .setLabel("🍒"),
                new Discord.StringSelectMenuOptionBuilder()
                .setDescription(`Connaissance`)
                .setValue("connaissance")
                .setLabel("🍇"),
                new Discord.StringSelectMenuOptionBuilder()
                .setDescription(`Plan Q`)
                .setValue("planq")
                .setLabel("🍉"),
                new Discord.StringSelectMenuOptionBuilder()
                .setDescription(`Coup d'un soir`)
                .setValue("coupdunsoir")
                .setLabel("🍑"),
            )
        
            const row = new Discord.ActionRowBuilder().addComponents(embedMenu)

            interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
    } else if(interaction.customId == "rencontre") {
        let choix;
        if(interaction.values[0] == "serious") choix = "Sérieux"
        else if(interaction.values[0] == "connaissance") choix = "Connaissance"
        else if(interaction.values[0] == "planq") choix = "Plan Q" 
        else if(interaction.values[0] == "coupdunsoir") choix = "Coup d'un soir"

        bot.db.query(`UPDATE user SET intention = ? WHERE userId = ${interaction.user.id}`, [choix]);
        const embed = new Discord.EmbedBuilder()
        .setDescription(`Vous avez bien modifié vos intentions`)
        .setColor('Green')
        interaction.update({ embeds: [embed], components: [] })
    }
  }
}