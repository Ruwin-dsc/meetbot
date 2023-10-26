const Discord = require('discord.js')

exports.help = {
    name: 'panel',
    description: 'Envoie le panel'
}

exports.run = async(bot, message) => {
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: message.guild.name + " By ruwinou", iconURL: message.guild.iconURL({ dynamic: true }), url: 'https://discord.gg/w8FzTaXffc' })
    .setDescription(
        `*Cliquer sur le bouton ci-dessous pour utiliser le bot*\n` +
        `\n` +
        `\`・ Profil :\`\n` +
        `> Vous pouvez créer ou modifier votre profil. Une fois votre profil créer vous pourrez l'envoyer dans le channel correspondant pour recevoir des demandes. Vous ne pouvez pas envoyer de demande à quelqu'un si vous n'avez pas de profil créé.\n` +
        `\n` + 
        `\`・ Envoyer :\`\n` +
        `> Vous pouvez envoyer votre profil dans le channel correspondant, l'envoie de profil est limité à 1 par jour.\n` +
        `\n` +
        `\`・ Information :\`` +
        `> Vous donne les informations par rapport à toutes vos demandes, match et likes reçu.` 
    )
    .setColor('LuminousVividPink')
    .setFooter({ text: "https://discord.gg/w8FzTaXffc" })
    .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1166720960519483462/7aac999f34d23f7de7c2291410550bab.gif?ex=654b8491&is=65390f91&hm=fd61d77459c55e49f40bd938b856ebbba332f0a4199468d6de8b280111257cb6&=&width=1000&height=552`)

    const botton1 = new Discord.ButtonBuilder()
    .setLabel(`Profil`)
    .setCustomId('profil')
    .setStyle(Discord.ButtonStyle.Primary)

    const botton2 = new Discord.ButtonBuilder()
    .setLabel(`Envoyer`)
    .setCustomId('send')
    .setStyle(Discord.ButtonStyle.Primary)

    const botton3 = new Discord.ButtonBuilder()
    .setLabel(`Informations`)
    .setCustomId('infos')
    .setStyle(Discord.ButtonStyle.Primary)

    const row = new Discord.ActionRowBuilder().addComponents(botton1, botton2, botton3)

    message.channel.send({ embeds: [embed], components: [row] })
}